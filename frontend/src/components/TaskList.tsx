import React from "react";
import API from "../services/api";

interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed?: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated }) => {
  // Function to mark task as completed
  const markDone = async (id: number) => {
    try {
      await API.put(`/tasks/${id}/complete`);
      onTaskUpdated(); 
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 mt-6">
     
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition ${
            task.is_completed
              ? "bg-green-100 text-green-800"
              : "bg-white text-gray-800" 
          }`}
        >
          {/* Task title & description */}
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                task.is_completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 ${task.is_completed ? "line-through" : ""}`}>
                {task.description}
              </p>
            )}
          </div>

          {!task.is_completed && (
            <button
              onClick={() => markDone(task.id)}
              className="mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition"
            >
              Mark Done
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
