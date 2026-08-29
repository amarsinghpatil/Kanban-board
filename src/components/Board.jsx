import React from "react";
import { useTask } from "../context/TaskContext";
import { Plus, AlertCircle, Calendar, Tag, ArrowDownCircle, Flag, Trash2, Archive } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Board({ onOpenNewTaskModal, onTaskClick }) {
  const { tasks, updateTask, deleteTask, archiveTask } = useTask();

  // Filter out archived tasks for active board display
  const activeTasks = tasks.filter((task) => !task.isArchived);

  // Separating active tasks into three different columns
  const todo = activeTasks.filter((task) => task.status === "todo");
  const inprogress = activeTasks.filter((task) => task.status === "in-progress");
  const done = activeTasks.filter((task) => task.status === "done");
  

  // 🔦 FLASHLIGHT 2: See tasks filtered for each column
  console.log("🟡 Todo Column:", todo);
  console.log("🟠 In-Progress Column:", inprogress);
  console.log("🟢 Done Column:", done);

  function formatDueDate(dateString) {
    if (!dateString) return "";
    try {
      const [year, month, day] = dateString.split("-");
      if (!year || !month || !day) return dateString;
      const dateObj = new Date(year, month - 1, day);
      return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch (error) {
      return dateString;
    }
  }

  function getPriorityStyle(priority) {
    if (priority === "high") {
      return "bg-red-100 text-red-800";
    } else if (priority === "medium") {
      return "bg-orange-100 text-orange-800";
    } else if (priority === "low") {
      return "bg-blue-100 text-blue-800";
    }
  }

  function getPriorityIcon(priority) {
    if (priority === "high") {
      return <AlertCircle className="h-3.5 w-3.5 text-red-500" />;
    } else if (priority === "medium") {
      return <Flag className="h-3.5 w-3.5 text-orange-500" />;
    } else {
      return <ArrowDownCircle className="h-3.5 w-3.5 text-blue-500" />;
    }
  }

  const handleOnDragEnd = (result) => {
    console.log("🖐️ Drag Event Result:", result);
    const { destination, source, draggableId } = result;

    // 1. If dropped outside any column container, cancel action
    if (!destination) {
      return;
    }

    // 2. If dropped in the exact same position in the same column, cancel action
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 3. Update task status in TaskContext to the destination column's droppableId
    updateTask(draggableId, { status: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className="max-w-7xl mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* TO DO COLUMN */}
          <div className="flex-1 bg-slate-200/50 border border-slate-200/80 rounded-xl p-4 h-[calc(100vh-170px)] flex flex-col gap-4">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-800">To do</h2>
                <span className="bg-slate-200 text-xs text-slate-700 px-2 py-0.5 rounded-full font-medium">
                  {todo.length}
                </span>
              </div>

              <button 
                className="hover:bg-slate-300/60 transition-colors rounded-lg p-2"
                onClick={onOpenNewTaskModal}>
                <Plus className="h-5 w-5 text-slate-800" />
              </button>  
            </div>

            <Droppable droppableId="todo">
              {(provided) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 py-1"
                >
                  {/* Adding card in todo column */}
                  {todo.map((task, index) => {
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onTaskClick(task)} 
                            className="group relative bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-slate-800 transition-all hover:shadow-md cursor-pointer min-w-0"
                          >
                            {/* Header row with Title and Hover Delete Button */}
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-sm text-slate-900 break-words min-w-0 flex-1">{task.title}</h3>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTask(task.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded text-slate-400 hover:text-red-600 shrink-0"
                                title="Delete task"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 break-words">{task.description}</p>

                            <div className="flex items-center justify-between mt-3">
                              {task.tags && task.tags.length > 0 && (
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <Tag className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                  <div className="flex flex-wrap gap-1">
                                    {task.tags.map((tag) => (
                                      <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded break-all">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}   

                              {task.priority && (
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {getPriorityIcon(task.priority)}
                                  <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded uppercase " + getPriorityStyle(task.priority)}>
                                    {task.priority}
                                  </span>
                                </div>
                              )}

                              {task.dueDate && task.dueDate !== "" && (
                                <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium shrink-0">
                                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                  <span>{formatDueDate(task.dueDate)}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* IN PROGRESS COLUMN */}
          <div className="flex-1 bg-slate-200/50 border border-slate-200/80 rounded-xl p-4 h-[calc(100vh-170px)] flex flex-col gap-4 min-w-0">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-800">In-Progress</h2>
                <span className="bg-yellow-100 text-yellow-800 font-medium text-xs px-2 py-0.5 rounded-full">
                  {inprogress.length}
                </span>
              </div>
            </div>

            <Droppable droppableId="in-progress">
              {(provided) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 py-1"
                >
                  {/* Adding card to inprogress column */}
                  {inprogress.map((task, index) => {
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onTaskClick(task)} 
                            className="group relative bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-slate-800 transition-all hover:shadow-md cursor-pointer min-w-0"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-sm text-slate-900 break-words min-w-0 flex-1">{task.title}</h3>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTask(task.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded text-slate-400 hover:text-red-600 shrink-0"
                                title="Delete task"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 break-words">{task.description}</p>

                            <div className="flex items-center justify-between mt-3">
                              {task.tags && task.tags.length > 0 && (
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <Tag className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                  <div className="flex flex-wrap gap-1">
                                    {task.tags.map((tag) => (
                                      <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded break-all">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {task.priority && (
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {getPriorityIcon(task.priority)}
                                  <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded uppercase " + getPriorityStyle(task.priority)}>
                                    {task.priority}
                                  </span>
                                </div>
                              )}

                              {task.dueDate && task.dueDate !== "" && (
                                <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium shrink-0">
                                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                  <span>{formatDueDate(task.dueDate)}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          
          {/* DONE COLUMN */}
          <div className="flex-1 bg-slate-200/50 border border-slate-200/80 rounded-xl p-4 h-[calc(100vh-170px)] flex flex-col gap-4 min-w-0">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-800">Done</h2>
                <span className="bg-green-100 text-green-800 font-medium text-xs px-2 py-0.5 rounded-full">
                  {done.length}
                </span>
              </div>
            </div>

            <Droppable droppableId="done">
              {(provided) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 py-1"
                >
                  {/* Adding card to done column */}
                  {done.map((task, index) => {
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onTaskClick(task)} 
                            className="group relative bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-slate-800 transition-all hover:shadow-md cursor-pointer min-w-0"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-sm text-slate-900 break-words min-w-0 flex-1">{task.title}</h3>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    archiveTask(task.id);
                                  }}
                                  className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition-colors"
                                  title="Archive task"
                                >
                                  <Archive className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                  }}
                                  className="p-1 hover:bg-red-100 rounded text-slate-400 hover:text-red-600 transition-colors"
                                  title="Delete task"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 break-words">{task.description}</p>

                            <div className="flex items-center justify-between mt-3">
                              {task.tags && task.tags.length > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <Tag className="h-3.5 w-3.5 text-slate-400" />
                                  <div className="flex flex-wrap gap-1">
                                    {task.tags.map((tag) => (
                                      <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {task.priority && (
                                <div className="flex items-center gap-1.5">
                                  {getPriorityIcon(task.priority)}
                                  <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded uppercase " + getPriorityStyle(task.priority)}>
                                    {task.priority}
                                  </span>
                                </div>
                              )}

                              {task.dueDate && task.dueDate !== "" && (
                                <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                  <span>{formatDueDate(task.dueDate)}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

        </div>
      </main>
    </DragDropContext>
  );
}
