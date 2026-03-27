import React, { useState, useEffect } from "react";
import API_URL from "../config";
import { toast } from "react-toastify";


const Timetable = () => {
  const [teachers, setTeachers] = useState([]);
  const classBranches = {
    MCA: ["Computer Science", "Information Technology"],
    MBA: ["Business Administration", "Finance"],
    "B.Tech": ["Computer Science", "Electronics", "Mechanical"],
  };

  const [timetableData, setTimetableData] = useState({
    semester: "",
    class: "",
    branch: "",
    days: Array(5)
      .fill()
      .map((_, i) => ({
        name: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i],
        slots: Array(7).fill({
          subject: "",
          teacher: "",
          time: "",
          type: "",
        }),
      })),
    unavailableTeachers: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-1:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
  ];

  const classTypes = ["Lecture", "Tutorial", "Practical", "Lab"];

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/teachers`);
      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }
      const data = await response.json();
      setTeachers(data.data.map((teacher) => teacher.name));
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Error fetching teachers list");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimetableData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "class" ? { branch: "" } : {}),
    }));
  };

  const handleSlotChange = (dayIndex, slotIndex, field, value) => {
    const updatedDays = [...timetableData.days];
    updatedDays[dayIndex].slots[slotIndex] = {
      ...updatedDays[dayIndex].slots[slotIndex],
      [field]: value,
      ...(field === "time" ? { teacher: "" } : {}),
    };

    setTimetableData((prev) => ({
      ...prev,
      days: updatedDays,
    }));
  };

  const getAvailableTeachers = (dayIndex, slotIndex) => {
    const { time } = timetableData.days[dayIndex].slots[slotIndex];
    if (!time) return teachers;

    const busyTeachers = timetableData.days[dayIndex].slots
      .filter(
        (slot, idx) => idx !== slotIndex && slot.time === time && slot.teacher,
      )
      .map((slot) => slot.teacher);

    return teachers.filter((teacher) => !busyTeachers.includes(teacher));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/timetables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timetableData),
      });

      if (!response.ok) {
        throw new Error("Failed to save timetable");
      }

      toast.success("Timetable saved successfully!");

      setTimetableData({
        semester: "",
        class: "",
        branch: "",
        days: Array(5)
          .fill()
          .map((_, i) => ({
            name: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i],
            slots: Array(7).fill({
              subject: "",
              teacher: "",
              time: "",
              type: "",
            }),
          })),
        unavailableTeachers: [],
      });
    } catch (error) {
       toast.error(error.message || "Error saving timetable");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight border-b pb-4">
            HOD Timetable Management
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Semester:
                </label>
                <select
                  name="semester"
                  value={timetableData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white font-medium"
                  required
                >
                  <option value="">Select Semester</option>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Class:
                </label>
                <select
                  name="class"
                  value={timetableData.class}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white font-medium"
                  required
                >
                  <option value="">Select Class</option>
                  {Object.keys(classBranches).map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch:
                </label>
                <select
                  name="branch"
                  value={timetableData.branch}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white disabled:bg-gray-200 font-medium"
                  required
                  disabled={!timetableData.class}
                >
                  <option value="">Select Branch</option>
                  {timetableData.class &&
                    classBranches[timetableData.class].map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Weekly Schedule
                </h3>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm custom-scrollbar">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead className="bg-gray-900 text-white sticky top-0 z-20">
                    <tr>
                      <th className="px-4 py-5 text-center text-xs font-black uppercase tracking-widest border-r border-gray-800 bg-gray-900 sticky left-0 z-30 min-w-[120px]">
                        Day / Time
                      </th>
                      {timeSlots.map((time, index) => (
                        <th
                          key={index}
                          className="px-4 py-5 text-center text-xs font-black uppercase tracking-widest whitespace-nowrap border-r border-gray-800 last:border-0 min-w-[200px]"
                        >
                          {time}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {timetableData.days.map((day, dayIndex) => (
                      <tr
                        key={dayIndex}
                        className="hover:bg-blue-50/20 transition-colors group"
                      >
                        <td className="px-4 py-6 whitespace-nowrap text-sm font-black text-gray-900 text-center border-r border-gray-100 bg-gray-50 sticky left-0 z-10 group-hover:bg-blue-50 transition-colors">
                          {day.name}
                        </td>
                        {day.slots.map((slot, slotIndex) => {
                          const availableTeachers = getAvailableTeachers(
                            dayIndex,
                            slotIndex,
                          );
                          return (
                            <td
                              key={slotIndex}
                              className="p-3 border-r border-gray-100 last:border-0 align-top"
                            >
                              <div className="flex flex-col space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Subject</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Mathematics"
                                    value={slot.subject}
                                    onChange={(e) =>
                                      handleSlotChange(
                                        dayIndex,
                                        slotIndex,
                                        "subject",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl text-sm focus:border-blue-500 outline-none transition-all placeholder-gray-300 font-bold"
                                    required
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Teacher</label>
                                  <select
                                    value={slot.teacher}
                                    onChange={(e) =>
                                      handleSlotChange(
                                        dayIndex,
                                        slotIndex,
                                        "teacher",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl text-sm focus:border-blue-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-300 cursor-pointer bg-white font-bold"
                                    required
                                    disabled={!slot.time}
                                  >
                                    <option value="">Select Faculty</option>
                                    {availableTeachers.map((teacher) => (
                                      <option key={teacher} value={teacher}>
                                        {teacher}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Time</label>
                                    <select
                                      value={slot.time}
                                      onChange={(e) =>
                                        handleSlotChange(
                                          dayIndex,
                                          slotIndex,
                                          "time",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full px-2 py-2 border-2 border-gray-100 rounded-xl text-[11px] focus:border-blue-500 outline-none cursor-pointer bg-white font-black"
                                      required
                                    >
                                      <option value="">Time</option>
                                      <option value={timeSlots[slotIndex]}>{timeSlots[slotIndex]}</option>
                                    </select>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Type</label>
                                    <select
                                      value={slot.type}
                                      onChange={(e) =>
                                        handleSlotChange(
                                          dayIndex,
                                          slotIndex,
                                          "type",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full px-2 py-2 border-2 border-gray-100 rounded-xl text-[11px] focus:border-blue-500 outline-none cursor-pointer bg-white font-black"
                                      required
                                    >
                                      <option value="">Type</option>
                                      {classTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Saving Timetable..." : "Save Timetable"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
