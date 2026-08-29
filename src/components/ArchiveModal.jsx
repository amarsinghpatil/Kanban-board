import React from "react";
import { useTask } from "../context/TaskContext";
import { Archive, X, RotateCcw, Trash2, Tag, Calendar } from "lucide-react";

export default function ArchiveModal({ isOpen, onClose }) {
  const { tasks, unarchiveTask, deleteTask } = useTask();

  if (!isOpen) return null;

  // Filter only archived tasks
  const archivedTasks = tasks.filter((task) => task.isArchived === true);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
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

        {/* Modal Content / Task List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {archivedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Archive className="h-12 w-12 text-slate-300 mb-3" />
              <p className="text-slate-600 font-semibold text-sm">No archived tasks found</p>
              <p className="text-slate-400 text-xs mt-1">
                Completed tasks archived from the Done column will appear here.
              </p>
            </div>
          ) : (
            archivedTasks.map((task) => (
              <div 
                key={task.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-slate-100/80"
              >
                {/* Task Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-slate-900 line-clamp-1">{task.title}</h3>
                  {task.description && (
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{task.description}</p>
                  )}
                  
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

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <button
                    onClick={() => unarchiveTask(task.id)}
                    className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                    title="Restore task back to active Kanban board"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Restore</span>
                  </button>

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

        {/* Modal Footer */}
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
