import React from "react";
// Import our central TaskContext hook to access tasks state & CRUD operations
import { useTask } from "../context/TaskContext";
// Import modern UI icons from Lucide React
import { Archive, X, RotateCcw, Trash2, Tag, Calendar } from "lucide-react";

/**
 * 📦 ArchiveModal Component
 * 
 * WHY THIS COMPONENT EXISTS:
 * When users complete tasks in the "Done" column, keeping them on the board forever causes clutter.
 * This modal acts as a dedicated "Archive Folder" where completed tasks are stored safely.
 * Users can view archived tasks, restore them back to the active board, or delete them permanently.
 * 
 * PROPS EXPECTED:
 * @param {boolean} isOpen - Controls whether this modal is visible (true) or hidden (false).
 * @param {function} onClose - Callback function sent from App.jsx to set isArchiveModalOpen(false).
 */
export default function ArchiveModal({ isOpen, onClose }) {
  // STEP 1: Connect to TaskContext elevator to read global state and action functions
  const { tasks, unarchiveTask, deleteTask } = useTask();

  // STEP 2: Early Return Guard Pattern
  // IF the modal is closed (isOpen === false), stop execution immediately and return null.
  // WHY: Returning null prevents React from rendering unnecessary hidden HTML elements into the browser DOM.
  if (!isOpen) return null;

  // STEP 3: Filter out only tasks that have been flagged with isArchived === true
  // WHY: The main board filters tasks where isArchived is false/undefined. Here we display the opposite.
  const archivedTasks = tasks.filter((task) => task.isArchived === true);

  return (
    // FULL-SCREEN BACKDROP OVERLAY
    // fixed inset-0 = covers 100% of screen viewport
    // z-50 = stacks on top of all other board components
    // bg-slate-900/60 = semi-transparent dark background for focus
    // backdrop-blur-sm = subtle glassy background blur effect
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      {/* MAIN MODAL BOX CONTAINER */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* 1. MODAL HEADER BAR */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Archive className="h-5 w-5 text-yellow-400" />
            <h2 className="text-base font-bold">Archived Tasks</h2>
            
            {/* Live Counter Badge */}
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              {archivedTasks.length}
            </span>
          </div>
          
          {/* Close X Button */}
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 2. MODAL BODY (SCROLLABLE TASK LIST ZONE) */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          
          {/* TERNARY OPERATOR: Branching UI based on whether archivedTasks is empty or has items */}
          {archivedTasks.length === 0 ? (
            
            // EMPTY STATE VIEW: Shown when no tasks are archived yet
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Archive className="h-12 w-12 text-slate-300 mb-3" />
              <p className="text-slate-600 font-semibold text-sm">No archived tasks found</p>
              <p className="text-slate-400 text-xs mt-1">
                Completed tasks archived from the Done column will appear here.
              </p>
            </div>
            
          ) : (
            
            // TASK CARD LIST: Maps through each archived task item
            archivedTasks.map((task) => (
              <div 
                key={task.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-slate-100/80"
              >
                {/* Left Side: Task Information */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-slate-900 line-clamp-1">{task.title}</h3>
                  
                  {/* Conditional Description rendering */}
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
                  {/* WHY: () => unarchiveTask(task.id) passes an arrow function reference so unarchiveTask */}
                  {/* only runs when the user actually clicks the button, not immediately during render. */}
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
            ))
          )}

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
