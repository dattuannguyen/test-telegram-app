import React, { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import {
  BottomBar,
  MainButton,
  SecondaryButton,
  BackButton,
} from "@twa-dev/sdk/react";

<BottomBar bgColor="#ff0000">
  <MainButton text="Continue" onClick={() => alert("continue")} />
  <SecondaryButton
    text="Cancel"
    position="bottom"
    onClick={() => alert("cancelled")}
  />
</BottomBar>;
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Load tasks from localStorage when the app initializes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      console.log("Loaded tasks from localStorage:", savedTasks);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Saving tasks to localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (): void => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTaskCompletion = (taskId: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: number): void => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          To-Do List
        </h1>
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter a new task"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center px-4 py-2 rounded-lg shadow-sm ${
                task.completed ? "bg-green-100" : "bg-gray-50"
              }`}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Here is the list ${tasks} `)
          }
        >
          Show Alert
        </button>
        <BottomBar bgColor="#ff0000">
          <MainButton text="Continue" onClick={() => alert("continue")} />
          <SecondaryButton
            text="Cancel"
            position="bottom"
            onClick={() => alert("cancelled")}
          />
        </BottomBar>
        <BackButton onClick={() => window.history.back()} />
      </div>
    </div>
  );
};

export default App;
