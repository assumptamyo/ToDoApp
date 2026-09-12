import React, { useState } from "react";
import { Check, Edit2, Trash2 } from "lucide-react";
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

  const taskId = task._id || task.id;

  const confirmAndDelete = (id) => {
    handleDeletedTask(id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="my-5 sm:my-3">
      {editingTask === taskId ? (
        <TaskEditForm
          task={task}
          onCancel={() => {
            setEditingTask(null);
          }}
          handleUpdatedTask={handleUpdatedTask}
        />
      ) : (
        <div
          className={`p-4 rounded-lg text-white border transition duration-200 select-none ${
            task.completed
              ? "bg-gray-800/20 border-white/10 opacity-60"
              : "bg-gray-800/80 border-white/20 hover:border-white/50"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={() => handleToggleTask(taskId, task.completed)}
              className="w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer"
            >
              {task.completed && (
                <Check className="p-0.5 text-white" size={14} />
              )}
            </button>
            <div className="flex-1 text-start space-y-1 sm:ml-4">
              <p
                className={`text-lg sm:text-xl sm:font-semibold ${
                  task.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p
                  className={`text-sm ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-white/60"
                  }`}
                >
                  {task.description}
                </p>
              )}
              <p className="text-xs text-gray-400 sm:text-gray-500">
                Created Date :{" "}
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="flex gap-0 sm:gap-5">
              <button
                onClick={() => setEditingTask(taskId)}
                className="p-3 transition-all duration-200 rounded-lg hover:bg-indigo-600/30 cursor-pointer"
              >
                <Edit2 size={16} />
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-3 transition-all duration-200 rounded-lg hover:bg-red-500/30 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 space-y-4 flex-col p-3">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-sm text-center shadow-2xl">
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmAndDelete(taskId)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600/80 text-white hover:bg-red-600 transition-colors cursor-pointer"
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
