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
  const markDone = async (id: number) => {
    try {
      await API.put(`/tasks/${id}/complete`);
      onTaskUpdated();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-3xl">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 py-6 border border-dashed border-gray-300 rounded-lg">
          <p className="text-sm"> No tasks available. Add one to get started!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-gray-200 p-4 rounded-lg flex justify-between items-start shadow-sm"
          >
            {/* Left: Title + Description */}
            <div className="flex-1 justify-start pr-4">
              <h3 className="font-semibold text-lg text-gray-800 break-words text-start">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 mt-1 text-sm break-words text-start">
                  {task.description}
                </p>
              )}
            </div>

            {/* Right: Action Button */}
            {!task.is_completed && (
              <button
                onClick={() => markDone(task.id)}
                className="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-50 transition"
              >
                Done
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
