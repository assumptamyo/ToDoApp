import React from "react";

const filters = ["All", "Pending", "Completed"];

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="flex gap-4 justify-center p-5 items-center max-w-fit mx-auto sm:mx-0 ">
      {filters.map((type) => {
        return (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`py-2 px-5 tracking-wide text-white rounded-lg cursor-pointer transition-colors duration-100 ${filter === type ? "bg-indigo-800/70" : "bg-gray-600/50 hover:bg-gray-500/60"}`}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;
