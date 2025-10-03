import './App.css'
import React, { useState, useEffect } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
    </div>
  );
}

export default App;
