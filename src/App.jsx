
import React, { useState } from "react";
import { TaskProvider } from "./context/TaskContext"; // Import our data store
import Header from "./components/Header";             // Import header placeholder
import Board from "./components/Board";               // Import board grid placeholder
import NewTaskModal from "./components/NewTaskModal"; // Import modal placeholder
import ArchiveModal from "./components/ArchiveModal"; // Import archive modal

export default function App() {
  // State: Remembers whether the "Create Task" popup form is open (true/false)
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // State: Remembers whether the "Archive Folder" popup is open (true/false)
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  // State: Remembers which card is currently clicked open in details view
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <TaskProvider>
      <div className="min-h-screen flex flex-col font-sans select-none">
        
        {/* Render Header */}
        <Header 
          onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
          onOpenArchiveModal={() => setIsArchiveModalOpen(true)}
        />

        {/* Render Board */}
        <Board 
          onTaskClick={(task) => setSelectedTask(task)}
          onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
        />

        {/* Render Create & Edit Modal */}
        <NewTaskModal
          isOpen={isNewTaskModalOpen || selectedTask !== null}
          onClose={() => {
            setIsNewTaskModalOpen(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
        />

        {/* Render Archive Folder Modal */}
        <ArchiveModal 
          isOpen={isArchiveModalOpen}
          onClose={() => setIsArchiveModalOpen(false)}
        />

      </div>
    </TaskProvider>
  );
}
