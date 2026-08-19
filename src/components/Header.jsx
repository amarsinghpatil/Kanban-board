import React from "react";
import { Plus, ListTodo, CheckSquare } from "lucide-react"
import { useTask } from "../context/TaskContext";



export default function Header ({onOpenNewTaskModal}){

  // Your Logic will go here
  const {tasks} = useTask();
  const totalTasks = tasks.length;
  
  const completedlist = tasks.filter((task) => {
    return task.status === "done";
  });

  const completcount = completedlist.length;
  const remaincount = totalTasks - completcount;
 
  
  
  return (
   
    <header className="bg-white border-b border-slate-200 px-6 py-4 ">

      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        

        {/* Left section */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-600/10 p-2 rounded-lg text-blue-500">
          <ListTodo className="h-6 w-6"/>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm font-bold text-slate-800">Kanban Board</h1>
          <p className="text-xs text-slate-700">Organize your tasks</p>
        </div>

      </div>

      {/* Right section */} 
       <div className="bg-slate-100 border border-slate-200 hidden sm:flex items-center gap-4 px-4 py-2 rounded-full">

        <div className = "flex items-center gap-2">
          <span className="text-slate-600 text-xs font-medium">Total tasks</span>
          <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-xs font-semibold">{totalTasks}</span>
        </div>

        <div className="h-4 w-px bg-slate-200"></div>

        <div className="flex items-center gap-2">
          <span className="text-slate-600 text-xs font-medium">Remaining</span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold">{remaincount}</span>
        </div>

        
      </div>
      </div>
    </header>
  )
};

