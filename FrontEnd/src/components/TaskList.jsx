import React from "react";
import TaskItems from "./TaskItems";

function TaskList({ tasks, loading, editingTask, setEditingTask ,handleUpdatedTask, handleDeletedTask, handleToggleTask }) {
  if (loading) {
    return (
      <div className="text-left px-5 pt-2 text-white">Loading Tasks...</div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-left px-5 pt-2 text-white">No Tasks Found.</div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItems
          key={task._id}
          task={task}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          handleUpdatedTask ={handleUpdatedTask}
          handleDeletedTask = {handleDeletedTask}
          handleToggleTask={handleToggleTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
