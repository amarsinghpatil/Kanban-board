
import React, { useState } from "react";
import { TaskProvider } from "./context/TaskContext"; // Import our data store
import Header from "./components/Header";             // Import header placeholder
import Board from "./components/Board";               // Import board grid placeholder
import NewTaskModal from "./components/NewTaskModal"; // Import modal placeholder
import TaskModal from "./components/TaskModal";       // Import edit modal placeholder

export default function App() {
  // State: Remembers whether the "Create Task" popup form is open (true/false)
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // State: Remembers which card is currently clicked open in details view
  const [selectedTask, setSelectedTask] = useState(null);

  return (

    <TaskProvider>
      <div className="min-h-screen flex flex-col font-sans select-none">
        
        {/* Render Header, pass a function to set isNewTaskModalOpen to true when clicked */}
        
        <Header />

        {/* Render Board, pass a function to store which card task was clicked */}
        <Board onTaskClick={(task) => setSelectedTask(task)}
        onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
        />

        {/* Render the Create Modal and Edit Modal   */}
        <NewTaskModal
          isOpen={isNewTaskModalOpen || selectedTask !== null}
          onClose={() => 
            {
              setIsNewTaskModalOpen(false)
              setSelectedTask(null)
            }}

          task={selectedTask}
        />

       

      </div>
    </TaskProvider>
    
  );
}
