import React, { useState } from "react";
import { PlusCircle, Check, X } from "lucide-react";
import TaskItems from "./TaskItems";

function TaskEditForm({ task, onCancel, handleUpdatedTask }) {
  const [title, setTitle] = useState(task?.title || " ");
  const [description, setDescription] = useState(task?.description || " ");

  const handleSumbit = (e) => {
    e.prevenDefault();
    if (!title.trim()) return;

    handleUpdatedTask(task._id, { title, description });
  };
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 space-y-4 flex-col p-3">
      <h1 className="text-2xl font-bold text-white">Task Editing</h1>
      <form onSubmit={handleSumbit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-5 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-200 placeholder="Type Title ..."`}
          required
        ></input>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" rounded-lg w-full p-5 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-200 rounder-lg bg-gray-700 text-white"
          placeholder="Task's Description (optional) ..."
          rows={4}
        ></textarea>

        <div className="flex justify-between gap-3">
          <button
            onClick={onCancel}
            className={`w-full flex items-center justify-center gap-2 py-3 px-5 bg-gray-600/50 text-white rounded-lg hover:bg-gray-800/50`}
          >
            <X size={16} /> Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              handleUpdatedTask(task._id, { title, description });
              setEditingTask(null);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-indigo-800/70 text-white rounded-lg hover:bg-indigo-800/50 text-sm"
          >
            <Check size={16} />
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEditForm;
