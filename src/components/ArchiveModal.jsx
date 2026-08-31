import React from "react";
import { useTask } from "../context/TaskContext";
import { Archive, X, RotateCcw, Trash2, Tag, Calendar } from "lucide-react";

/**
 * 📦 ArchiveModal Component (Beginner-Friendly Version)
 * 
 * WHY THIS COMPONENT EXISTS:
 * Stores archived tasks in a popup window so your main board stays clean and organized.
 */
export default function ArchiveModal({ isOpen, onClose }) {
  // Step 1: Get data and functions from TaskContext
  const { tasks, unarchiveTask, deleteTask } = useTask();

  // Step 2: Guard check - If modal is closed, return null (render nothing)
  if (isOpen === false) {
    return null;
  }

  // Step 3: Filter list of tasks that have isArchived set to true
  const archivedTasks = tasks.filter((task) => {
    return task.isArchived === true;
  });

  // Step 4: IF-ELSE Block to decide what to display inside the modal
  let modalContent;

  if (archivedTasks.length === 0) {
    // Case A: No archived tasks exist -> Show Empty State message
    modalContent = (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Archive className="h-12 w-12 text-slate-300 mb-3" />
        <p className="text-slate-600 font-semibold text-sm">No archived tasks found</p>
        <p className="text-slate-400 text-xs mt-1">
          Tasks archived from any column on your board will appear here.
        </p>
      </div>
    );

  } else {
    // Case B: Archived tasks exist -> Loop through and create task cards
    modalContent = archivedTasks.map((task) => {
      return (
        <div 
          key={task.id}
          className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-slate-100/80"
        >
          {/* Left Side: Task Information */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-slate-900 line-clamp-1">{task.title}</h3>
            
            {/* Description */}
            {task.description && (
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{task.description}</p>
            )}
            
            {/* Priority & Tags Footer */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {task.priority && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                  {task.priority}
                </span>
              )}
              
              {task.tags && task.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] text-slate-500">#{task.tags.join(", #")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
            
            {/* RESTORE BUTTON */}
            <button
              onClick={() => unarchiveTask(task.id)}
              className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
              title="Restore task back to active Kanban board"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restore</span>
            </button>

            {/* PERMANENT DELETE BUTTON */}
            <button
              onClick={() => deleteTask(task.id)}
              className="p-1.5 hover:bg-red-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
              title="Delete permanently"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

        </div>
      );
    });
  }

  // Step 5: Return JSX with modal Content
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Archive className="h-5 w-5 text-yellow-400" />
            <h2 className="text-base font-bold">Archived Tasks</h2>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              {archivedTasks.length}
            </span>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {modalContent}
        </div>

      </div>
    </div>
  );
}
