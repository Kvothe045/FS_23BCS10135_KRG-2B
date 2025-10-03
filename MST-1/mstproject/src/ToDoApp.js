import React, { useState } from "react";

function TodoApp() {

  const [tasks, setTasks] = useState([]);

  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput === "") {
      return; 
    }

    const newTask = {
      id: Date.now(), 
      text: taskInput,
      done: false,
    };


    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    setTaskInput("");
  };



  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className=" bg-green-100 p-8 max-w-md mx-auto  min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Todo List EXPERIMENT 01</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Type a task..."
          className="border p-2 flex-1"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 ml-2"
        >
          Add
        </button>
      </div>

      <div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center mb-2 p-2 bg-yellow-100 rounded"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />

            <span className={task.done ? "line-through text-gray-500" : ""}>
              {task.text}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="ml-auto text-red-500 font-width-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
