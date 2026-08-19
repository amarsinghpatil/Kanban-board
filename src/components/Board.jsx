import React from "react";
import { useTask } from "../context/TaskContext";
import {Plus, AlertCircle, Calendar, Tag, ArrowDownCircle, Flag} from 'lucide-react';



export default function Board({onOpenNewTaskModal}) {

    const {tasks} = useTask();

    // separating the tasks into three different columns
    const todo = tasks.filter((task) =>task.status === "todo");
    const inprogress = tasks.filter((task)=> task.status === "in-progress");
    const done = tasks.filter((task)=> task.status ==="done");

    function getprioritystyle(priority) {
      if (priority==="high"){
        return "bg-red-100 text-red-800";
      } else if(priority==="medium"){
        return "bg-orange-100 text-orange-800"
      } else if(priority ==="low") {
        return "bg-blue-100 text-blue-800"
      }
    }

    function getpriorityicon(priority) {
  if (priority === "high") {
    return <AlertCircle className="h-3.5 w-3.5 text-red-500" />;
  } else if (priority === "medium") {
    return <Flag className="h-3.5 w-3.5 text-orange-500" />;
  } else {
    return <ArrowDownCircle className="h-3.5 w-3.5 text-blue-500" />;
  }
}

  return (
    <main className="max-w-6xl mx-auto w-full px-6 py-8">

      <div className="flex flex-col md:flex-row gap-4">

        {/* TO DO COLUMN */}
        <div className="flex-1 bg-slate-200/50 border border-slate-200/80 rounded-xl p-4 min-h-[600px] flex flex-col gap-4">
          
            <div className="flex items-center justify-between h-10">
                  
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-slate-800">To do</h2>
                    <span className="bg-slate-200 text-xs text-slate-700 px-2 py-0.5 rounded-full font-medium">{todo.length}</span>
                  </div>
          
                  <button className="hover:bg-slate-300/60 transition-colors rounded-lg p-2">
                    <Plus className="h-5 w-5 text-slate-800" onClick={onOpenNewTaskModal}/>
                  </button>  
            </div>

                {/*Adding card to todo columns*/}
                {todo.map((task)=>{

                  return (
                            <div key={task.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-slate-800">

             
                                  {/* outer row spaced for left and right side */}
                                  <div className=" items-center justify-between ">

                                      <h3 className="font-semibold text-sm text-slate-900">{task.title}</h3>
                                      <p className="text-xs text-slate-600 mt-1">{task.description}</p>

                                          {/* parent flex container span left,middle, right */}
                                        <div className="flex items-center justify-between mt-3">

                                              {/* left tag group */}
                                            <div className="flex items-center gap-1.5">
                                                <Tag className="h-3.5 w-3.5 text-slate-400"/>

                                                {/* left side container for tag list */}
                                              <div className="flex flex-wrap gap-1">
                                                {task.tags.map((tag) => (                       
                                                    <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                                                      #{tag}
                                                    </span>
                                                  )) } 
                                              </div>
                                            </div>    

                                              <div className="flex items-center gap-1.5 ">
                                          
                                                {getpriorityicon(task.priority)}
                                          
                                                <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded uppercase " + getprioritystyle(task.priority)}>
                                                  {task.priority}
                                                </span>

                                              </div>

                                              {/* right side for date due */}
                                                <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                                   <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                    <span>{task.dueDate}</span>
                                                </span>
                                        </div>

                                  </div>
                             </div>
                          )
                 })}

        </div>

        {/* IN PROGRESS COLUMN */ }
        <div className="flex-1 bg-slate-200/50 border border-slate-200/80 rounded-xl p-4 min-h-[600px] flex flex-col gap-4">

          <div className="flex items-center justify-between h-10">

              <div className= "flex items-center gap-2">

                <h2 className=" text-sm font-semibold text-slate-800">In-Progress</h2>
                <span className="bg-yellow-100 text-yellow-800 font-medium text-xs px-2 py-0.5 rounded-full">{inprogress.length}</span>

              </div>
          </div>

          {/* Adding card to inprogress columns*/}
          {inprogress.map((task) => {
            return (
              <div key={task.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-slate-800">
                
                {/* <h3 className="font-semibold text-sm">{task.title}</h3> */}
                
                  <h3 className="font-semibold text-sm text-slate-900">{task.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{task.description}</p>

                  <div className="flex items-center justify-between mt-3">

                     <div className="flex items-center gap-1.5">
                             <Tag className="h-3.5 w-3.5 text-slate-400"/>

                                {/* left side container for tag list */}
                              <div className="flex flex-wrap gap-1">
                                   {task.tags.map((tag) => (                       
                                     <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                                           #{tag}
                                     </span>
                                   ))
                                  } 
                                                
                              </div>
                     </div>

                     <div className="flex items-center gap-1.5">
                           {getpriorityicon(task.priority)}
                           <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded uppercase " + getprioritystyle(task.priority)}>
                               {task.priority}
                           </span>
                     </div>

                     <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                             <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>{task.dueDate}</span>
                     </span>

                  </div>
                
              </div>
            )
          })}

        </div>
        
        {/* Done Column */}

        <div className="flex-1 bg-slate-200/50 border border-slate-200/80 rounded-xl p-4 min-h-[600px] flex flex-col gap-4">

          <div className="flex items-center justify-between h-10">

            <div className="flex items-center gap-2">

              <h2 className="text-sm font-semibold text-slate-800">Done</h2>
              <span className="bg-green-100 text-green-800 font-medium text-xs px-2 py-0.5 rounded-full">{done.length}</span>

            </div>
          </div>

          {/* Adding card to done columns*/}

          {done.map((task)=> {
            return(
              <div key={task.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-slate-800">

                       <h3 className="font-semibold text-sm text-slate-900">{task.title}</h3>
                       <p className="text-xs text-slate-600 mt-1">{task.description}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1.5">
                             <Tag className="h-3.5 w-3.5 text-slate-400"/>

                                 {/* left side container for tag list */}
                               <div className="flex flex-wrap gap-1">
                                    {task.tags.map((tag) => (                       
                                      <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                                            #{tag}
                                      </span>
                                    ))
                                   } 
                                                 
                               </div>
                      </div>

                     <div className="flex items-center gap-1.5">
                           {getpriorityicon(task.priority)}
                           <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded uppercase " + getprioritystyle(task.priority)}>
                               {task.priority}
                           </span>
                     </div>

                                   {/* right side for date due */}
                            <span className="flex items-center gap-1 text-[10px] text-slate-500  font-medium">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                               <span>{task.dueDate}</span>
                            </span>

                      </div> 
                  </div>
            )
          })}

        </div>

    </div>
    </main>
  );
}
