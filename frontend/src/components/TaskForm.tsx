import React, { useState } from "react";
import API from "../services/api";
interface TaskFormProps {
 
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      // Send POST request
      await API.post("/tasks", { title, description });
      
      // Reset form fields
      setTitle("");
      setDescription("");
      
      
      onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      {/* Form heading */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add New Task
      </h2>

      {/* Title input field */}
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1 font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter task title"
          required
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
      </div>

      {/* Description input field */}
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1 font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          rows={4}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
