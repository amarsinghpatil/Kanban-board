import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { useTask } from "../context/TaskContext";

export default function NewTaskModal({ isOpen, onClose}) {

  const { addTask } = useTask();

  // 1. Hook memory variables MUST be at the very top of the component!
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      setError("Please enter both a Title and a Description!");
      return;
    }

    let taglist = [];
    if (tags.trim() !== "") {
      taglist = tags.split(",").map((t) => t.trim());
    }

    // Call addTask to save only what the user entered
    addTask({
      title: title.trim(),
      description: description.trim(),
      status: "todo",
      priority: priority,
      dueDate: dueDate,
      tags: taglist
    });

    // Clear the form fields and error for next time
    setTitle("");
    setDescription("");
    setTags("");
    setPriority("medium");
    setDueDate("");
    setError("");

    // Close the modal window
    onClose();
  };

  // 2. Guard check: If modal is closed, return null
  if(isOpen === false) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      {/* 1. Fullscreen Backdrop */}
      
      {/* 2. Sticky Note Card Container */}
      <div className="bg-yellow-50 border-l-8 border-yellow-400 rounded-xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-4 text-slate-800"> 

        {/* Modal Header + Close Icon */}
        <div className="flex items-center justify-between"> 
            <h2 className="text-xl font-semibold text-slate-800">New Task</h2>
            <button onClick={() => { setError(""); onClose(); }}>
                <X className="h-5 w-5 text-slate-500 hover:text-slate-700" />
            </button>
        </div>

        {/* Inline Custom Error Banner */}
        {error && (
          <div className="bg-red-100/90 border border-red-300 text-red-800 text-xs px-3 py-2 rounded-lg flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Title Input */}  
          <div>
            <label className="text-xs font-bold text-yellow-900 block mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Design Header Component" 
              className="w-full bg-amber-100/60 border border-amber-300/80 rounded-lg p-2.5 text-sm text-amber-950 placeholder-amber-800/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-inner font-medium"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="text-xs font-bold text-yellow-900 block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add detailed notes here..."
              className="w-full bg-amber-100/60 border border-amber-300/80 rounded-lg p-2.5 text-sm text-amber-950 placeholder-amber-800/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 h-24 resize-none transition-all shadow-inner font-medium"
            ></textarea>
          </div>

          {/* Tags Input */}
          <div>
            <label className="text-xs font-bold text-yellow-900 block mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Feature, UI, Bug"
              className="w-full bg-amber-100/60 border border-amber-300/80 rounded-lg p-2.5 text-sm text-amber-950 placeholder-amber-800/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-inner font-medium"
            />
          </div>

          {/* Priority and Due Date Side-by-side Row */}
          <div className="flex gap-3">
            {/* Priority */}
            <div className="flex-1">
              <label className="text-xs font-bold text-yellow-900 block mb-1">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-amber-100/60 border border-amber-300/80 rounded-lg p-2.5 text-sm text-amber-950 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all cursor-pointer shadow-inner">
                <option value="high" className="bg-yellow-50 text-slate-800">🔥 High</option>
                <option value="medium" className="bg-yellow-50 text-slate-800">🚩 Medium</option>
                <option value="low" className="bg-yellow-50 text-slate-800">🔹 Low</option>
              </select>              
            </div>
      
            {/* Due Date */}
            <div className="flex-1">
              <label className="text-xs font-bold text-yellow-900 block mb-1">Due Date</label>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-amber-100/60 border border-amber-300/80 rounded-lg p-2.5 text-sm text-amber-950 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all cursor-pointer shadow-inner"
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
