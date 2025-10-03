import './App.css'
import { useState, useEffect } from "react";
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
    <div className="App min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">To-Do List App</h1>

      {/*  container */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        
        {/*  Task Form */}
        <div className="w-full md:w-1/3">
          <TaskForm onTaskAdded={fetchTasks} />
        </div>

        {/* Task List */}
        <div className="w-full md:w-2/3">
          <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
