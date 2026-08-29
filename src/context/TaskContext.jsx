import {createContext, useContext, useState, useEffect} from "react";
import {initialTasks} from "../utils/mockData";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    // state and CRUD function 

    const [tasks, setTasks] = useState(() => {

        const savedTasks = localStorage.getItem("Kanban-tasks");

        if(savedTasks){  // retrive data from local storage
            try {
            return JSON.parse(savedTasks) // convert string back to JS array

        }  catch (error){

            console.error("Failed to parse tasks from localStorage", error);
            return initialTasks;  // If parsing fails, return the default tasks
        } 

        } else {
            return initialTasks;  // If no saved tasks found, return the default tasks
        }

    });


    useEffect(() => { // save data to local storage
        const tasksString = JSON.stringify(tasks); // convert array to text string
        localStorage.setItem("Kanban-tasks", tasksString); // store it in local storage
    }, [tasks]);

    // Add a new Task
    const addTask = (taskData) => {

        const newTask = { 
             ...taskData,
              id: `task-${Date.now()}` 
        };

             setTasks((prevTasks) => {
                 const newList = [...prevTasks, newTask];
                 return newList; // <--- EXPLICIT RETURN to setTasks!
    });
    
    };

     // update task
  const updateTask = (id, updatedFields) => {
      setTasks((prevTasks) => {
          
          // Step 1: Create a new list where we update the target task
          const updatedList = prevTasks.map((task) => {
              if (task.id === id) {
                  return { ...task, ...updatedFields }; // Merge updated fields into task
              } else {
                  return task; // Keep: Leave this task unchanged
              }
          });

          // Step 2: Return this new list to update React state
          return updatedList;
      });
  };

      // delete task
  const deleteTask = (taskId) => {
      setTasks((prevTasks) => {
          
          // Step 1: Filter out the task we want to delete
          const filteredList = prevTasks.filter((task) => {
              // If the task ID is different, we want to KEEP it
              const isDifferentTask = (task.id !== taskId); 
              return isDifferentTask; 
          });

          // Step 2: Return the shorter list to update React state
          return filteredList;
      });
  };

  // Archive a task
  const archiveTask = (taskId) => {
      updateTask(taskId, { isArchived: true });
  };

  // Restore an archived task back to the active board
  const unarchiveTask = (taskId) => {
      updateTask(taskId, { isArchived: false });
  };

    return(
        
        <TaskContext.Provider value={{tasks, addTask, updateTask, deleteTask, archiveTask, unarchiveTask}}>
            {children}
        </TaskContext.Provider> 
    )
}   

export const useTask = () => useContext(TaskContext)