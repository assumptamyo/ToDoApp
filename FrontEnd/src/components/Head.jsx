import React from "react";
import { ListTodo } from "lucide-react";
function Head() {
  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <ListTodo className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 shrink-0"></ListTodo>
        <h1 className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent leading-none font-extrabold text-xl sm:text-3xl ">
          Task Workspace
        </h1>
      </div>
      <p className="text-sm text-gray-200">
        Organize Your Workflow efficiently!
      </p>
    </div>
  );
}
export default Head;
