import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ToDoApp from './ToDoApp';  
import StudentCards from './StudentCard';  

function App() {
  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-200">
          <Link to="/todo" className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
            Todo-EXP-1
          </Link>
          <Link to="/students" className="px-4 py-2 bg-green-500 text-white rounded">
            Students-EXP-2
          </Link>
        </nav>

        <Routes>
          <Route path="/todo" element={<ToDoApp />} />
          <Route path="/students" element={<StudentCards />} />
          <Route path="/" element={<ToDoApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
