import React from "react";
import { useState } from "react";
import { Check, Edit2, Trash2, AlertTriangle } from "lucide-react";
import TaskEditForm from "./TaskEditForm";

function TaskItems({
  task,
  editingTask,
  handleUpdatedTask,
  setEditingTask,
  handleDeletedTask,
  handleToggleTask,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const confirmAndDelete = (id) => {
    handleDeletedTask(id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`my-5 sm:my-3`}>
      {editingTask === task._id ? (
        <TaskEditForm
          task={task}
          onCancel={() => {
            setEditingTask(null);
          }}
          handleUpdatedTask={handleUpdatedTask}
        />
      ) : (
        <div
          className={`p-4 rounded-lg text-white border transition duration-200 ${task.completed ? "bg-gray-800/20 border-white/10 opacity-60" : "bg-gray-800/80 border-white/20 hover:border-white/50"}`}
        >
          <div className={`flex items-center justify-between gap-2 sm:gap-4`}>
            <button
              onClick={() => handleToggleTask(task._id)}
              className={`w-5 h-5 rounded-full border`}
            >
              {task.completed && <Check className={`mx-auto p-1`} size={16} />}
            </button>
            <div className={`flex-1 text-start space-y-1 sm:ml-4`}>
              <p
                className={`text-lg sm:text-xl sm:font-semibold ${task.completed ? "line-through" : "text-white "}`}
              >
                {task.title}{" "}
              </p>
              {task.description && (
                <p className={`text-sm text-white/60 ${task.completed ? "line-through" : "text-white"} `}>{task.description}</p>
              )}
              <p className={`text-xs text-gray-400 sm:text-gray-500`}>
                Created Date :{" "}
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className={`flex gap-0 sm:gap-5`}>
              <button
                onClick={() => setEditingTask(task._id)}
                className={`p-3 transition-all duration-200 rounded-lg hover:bg-indigo-600/30 `}
              >
                <Edit2 size={16} />
              </button>
              {/* show delete confirm form  */}
              {/* Delete Confirm Modal */}
             
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className={`p-3 transition-all duration-200 rounded-lg hover:bg-red-500/30 `}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

       {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-100 space-y-4 flex-col p-3">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-sm text-center shadow-2xl">
                    <p className="text-sm text-gray-400 mb-6">
                      Are you sure you want to delete?
                    </p>

                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => confirmAndDelete(task._id)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-800/70 text-white hover:bg-indigo-500/70 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
    </div>
  );
}

export default TaskItems;
