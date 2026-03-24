import React, { useState, useEffect } from "react";

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
  const [submitStatus, setSubmitStatus] = useState(null);

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
      const response = await fetch("/api/teachers");
      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }
      const data = await response.json();
      setTeachers(data.data.map((teacher) => teacher.name));
    } catch (error) {
      console.error("Error fetching teachers:", error);
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
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/timetables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timetableData),
      });

      if (!response.ok) {
        throw new Error("Failed to save timetable");
      }

      setSubmitStatus({
        success: true,
        message: "Timetable saved successfully!",
      });

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
      setSubmitStatus({
        success: false,
        message: error.message || "Error saving timetable",
      });
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

              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-4 text-center text-sm font-semibold tracking-wide border-r border-gray-700 bg-gray-900 sticky left-0 z-10 w-28 shrink-0">
                        Day/Time
                      </th>
                      {timeSlots.map((time, index) => (
                        <th
                          key={index}
                          className="px-4 py-4 text-center text-sm font-semibold whitespace-nowrap border-r border-gray-700 shrink-0 min-w-[180px]"
                        >
                          {time}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timetableData.days.map((day, dayIndex) => (
                      <tr
                        key={dayIndex}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center border-r border-gray-200 bg-gray-50 sticky left-0 z-10">
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
                              className="p-2 border-r border-gray-200 last:border-0 align-top"
                            >
                              <div className="flex flex-col space-y-2">
                                <input
                                  type="text"
                                  placeholder="Subject"
                                  value={slot.subject}
                                  onChange={(e) =>
                                    handleSlotChange(
                                      dayIndex,
                                      slotIndex,
                                      "subject",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-medium"
                                  required
                                />
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white"
                                  required
                                >
                                  <option value="">Select Time</option>
                                  <option value={timeSlots[slotIndex]}>
                                    {timeSlots[slotIndex]}
                                  </option>
                                </select>
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer bg-white"
                                  required
                                  disabled={!slot.time}
                                >
                                  <option value="">Select Teacher</option>
                                  {availableTeachers.map((teacher) => (
                                    <option key={teacher} value={teacher}>
                                      {teacher}
                                    </option>
                                  ))}
                                </select>
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white"
                                  required
                                >
                                  <option value="">Select Type</option>
                                  {classTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
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

              {submitStatus && (
                <div
                  className={`mt-6 p-4 rounded-xl font-medium text-center ${submitStatus.success ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}
                >
                  {submitStatus.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
