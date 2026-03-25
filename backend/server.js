require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

// 📋 Request Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n📨 [${timestamp}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("   📦 Body:", JSON.stringify(req.body));
  }
  const originalSend = res.send;
  res.send = function (data) {
    console.log(`   ✅ Response sent for ${req.method} ${req.url}`);
    return originalSend.call(this, data);
  };
  const originalJson = res.json;
  res.json = function (data) {
    console.log(`   ✅ Response sent for ${req.method} ${req.url}`);
    return originalJson.call(this, data);
  };
  next();
});

const signSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  utype: String,
});

const signmodel = mongoose.model("signup", signSchema, "signup");

app.post("/signup", async (req, res) => {
  const result = new signmodel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    utype: "user",
  });

  const data = await result.save();
  if (data) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

app.post("/login", async (req, res) => {
  const result = await signmodel.findOne({ email: req.body.email });

  if (!result) {
    return res.send({ statuscode: 0 }); // Email not found
  }

  if (result.password === req.body.password) {
    return res.send({
      statuscode: 1,
      utype: result.utype,
      memberdata: result,
    });
  } else {
    return res.send({ statuscode: 0 }); // Password incorrect
  }
});

// Define Mongoose Schemas
const TimeSlotSchema = new mongoose.Schema({
  subject: String,
  teacher: String,
  time: String,
  type: String,
});

const DaySchema = new mongoose.Schema({
  name: String,
  slots: [TimeSlotSchema],
});

const TimetableSchema = new mongoose.Schema({
  semester: Number,
  class: String,
  branch: String,
  days: [DaySchema],
  unavailableTeachers: [String],
  createdAt: { type: Date, default: Date.now },
});

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  department: String,
  specialization: String,
  createdAt: { type: Date, default: Date.now },
});

// Create Mongoose Models
const Timetable = mongoose.model("Timetable", TimetableSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);

// Teacher Endpoints
app.post("/api/teachers", async (req, res) => {
  try {
    const { name, email, department, specialization } = req.body;

    const newTeacher = new Teacher({
      name,
      email,
      department,
      specialization,
    });

    const savedTeacher = await newTeacher.save();
    res.status(201).json({
      success: true,
      message: "Teacher added successfully",
      data: savedTeacher,
    });
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add teacher",
      error: error.message,
    });
  }
});

app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json({
      success: true,
      data: teachers,
    });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
});

// Timetable Endpoints
app.post("/api/timetables", async (req, res) => {
  try {
    const {
      semester,
      class: className,
      branch,
      days,
      unavailableTeachers,
    } = req.body;

    const newTimetable = new Timetable({
      semester,
      class: className,
      branch,
      days,
      unavailableTeachers,
    });

    const savedTimetable = await newTimetable.save();
    res.status(201).json({
      success: true,
      message: "Timetable saved successfully",
      data: savedTimetable,
    });
  } catch (error) {
    console.error("Error saving timetable:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save timetable",
      error: error.message,
    });
  }
});

app.get("/api/timetables", async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json({
      success: true,
      data: timetables,
    });
  } catch (error) {
    console.error("Error fetching timetables:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch timetables",
      error: error.message,
    });
  }
});

// Student Endpoints (existing code remains the same)
const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  rollNo: String,
  semester: String,
  class: String,
  branch: String,
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", StudentSchema);

const StudentAuthSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

const StudentAuth = mongoose.model("StudentAuth", StudentAuthSchema);

app.post("/api/students", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNo,
      semester,
      class: className,
      branch,
    } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const student = new Student({
      name,
      email,
      rollNo,
      semester,
      class: className,
      branch,
    });

    const savedStudent = await student.save();

    const hashedPassword = await bcrypt.hash(password, 10);
    const studentAuth = new StudentAuth({
      email,
      password: hashedPassword,
      studentId: savedStudent._id,
    });

    await studentAuth.save();

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: {
        id: savedStudent._id,
        name: savedStudent.name,
        email: savedStudent.email,
      },
    });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register student",
      error: error.message,
    });
  }
});

app.post("/api/students/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const studentAuth = await StudentAuth.findOne({ email }).populate(
      "studentId",
    );

    if (!studentAuth) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, studentAuth.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const student = await Student.findById(studentAuth.studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student record not found",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: student._id,
        name: student.name,
        email: student.email,
        semester: student.semester,
        class: student.class,
        branch: student.branch,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const conn = mongoose.connection;
    console.log(`🚀 Database connected: ${conn.host}`);
    console.log(`📁 Database Name: ${conn.name}`);
    console.log("✅ MongoDB Atlas connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    console.log(`⚠️ Attempted URI: ${process.env.MONGO_URI?.split('@')[1] || 'undefined'}`); 
  });
