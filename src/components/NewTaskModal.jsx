import React from "react";
import { X } from "lucide-react";

export default function NewTaskModal({ isOpen, onClose}) {

  // if the modal is false then do not render anything
  if(isOpen === false) {
    return null ; 

  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      {/* 1. Fullscreen Backdrop */}
      
      {/* 2. Sticky Note Card Container */}
      <div className="bg-yellow-50 border-l-8 border-yellow-400 rounded-xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-4 text-slate-800"> 

        {/* Modal Header + Close Icon */}
        <div className="flex items-center justify-between"> 
            <h2 className="text-xl font-semibold text-slate-800">New Task</h2>
            <button onClick={onClose}>
                <X className="h-5 w-5 text-slate-500 hover:text-slate-700" />
            </button>
        </div>

        {/* Form Container */}
        <form className="flex flex-col gap-3">
          {/* Title Input */}  
          <div>
            <label className="text-xs font-bold text-yellow-900 block mb-1">Title</label>
            <input 
              type="text" 
              placeholder="e.g. Design Header Component" 
              className="w-full bg-white/90 border border-yellow-300 rounded-lg p-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all shadow-inner"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="text-xs font-bold text-yellow-900 block mb-1">Description</label>
            <textarea
              placeholder="Add detailed notes here..."
              className="w-full bg-white/90 border border-yellow-300 rounded-lg p-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 h-24 resize-none transition-all shadow-inner"
            ></textarea>
          </div>

          {/* Tags Input */}
          <div>
            <label className="text-xs font-bold text-yellow-900 block mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Feature, UI, Bug"
              className="w-full bg-white/90 border border-yellow-300 rounded-lg p-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all shadow-inner"
            />
          </div>

          {/* Priority and Due Date Side-by-side Row */}
          <div className="flex gap-3">
            {/* Priority */}
            <div className="flex-1">
              <label className="text-xs font-bold text-yellow-900 block mb-1">Priority</label>
              <select className="w-full bg-white/90 border border-yellow-300 rounded-lg p-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all cursor-pointer">
                <option value="high">🔥 High</option>
                <option value="medium">🚩 Medium</option>
                <option value="low">🔹 Low</option>
              </select>              
            </div>
      
            {/* Due Date */}
            <div className="flex-1">
              <label className="text-xs font-bold text-yellow-900 block mb-1">Due Date</label>
              <input 
                type="date"
                className="w-full bg-white/90 border border-yellow-300 rounded-lg p-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold rounded-lg py-2.5 text-sm transition-colors shadow-md"
            >
              + Create Task
            </button>
          </div>
        </form>


    </div>

  </div>
);

}
