import React from "react";

function StudentCard({ name, rollNumber, course }) {
  return (
    <div className="border p-4 m-2 bg-green-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-lg text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-800">Roll No: {rollNumber}</p>
      <p className="text-gray-800">Course: {course}</p>
    </div>
  );
}

function StudentCards() {
  const students = [
    { id: 1, name: "ARYAN", rollNumber: "23BCS10135", course: "CS" },
    { id: 2, name: "Shashwat", rollNumber: "1", course: "IT" },
    { id: 3, name: "ADITYA", rollNumber: "2", course: "FS" },
    { id: 4, name: "Raj", rollNumber: "3", course: "ECE" },
  ];

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Student Cards EXPERIMENT - 2 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            rollNumber={student.rollNumber}
            course={student.course}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentCards;
