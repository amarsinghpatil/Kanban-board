# 📋 Kanban Board Project Details

Build a Kanban-style task management application using React JS that allows users to create, organize, and move tasks between columns like "To Do", "In Progress", and "Done". This project focuses on drag-and-drop interaction, state state management, and local persistence.

---

## 🎯 Project Overview & Objectives

### 1. Task Board Layout
- **Visual Columns:** Display multiple task columns: *To Do*, *In Progress*, and *Done*.
- **Task Cards:** Each column should show task cards displaying key information:
  - Title
  - Description
  - Optional Tags
  - Priority Level
- **Responsive Layout:** Must use a mobile-friendly responsive layout utilizing TailwindCSS.

### 2. Core Functionality (CRUD)
- **Add Tasks:** Allow users to create new tasks via an input form/modal (specifying task name, description, status, priority, and tags).
- **Edit/Delete Tasks:** Enable editing or deleting tasks directly using action buttons on each task card or via a detail view.
- **Task Details Modal:** On clicking a task, open a modal to view full details with inline editing for fields like description or status.
- **Persistence:** Task data must persist via `localStorage` so that no progress is lost on page reload.

### 3. Drag and Drop Interaction
- **Smooth Movement:** Implement drag-and-drop functionality to move tasks between columns.
- **State Updates:** Dragging a task should dynamically update the internal React state and persist the change in `localStorage`.
- **Libraries:** Use either `@hello-pangea/dnd` (the modern React 18 compatible fork of `react-beautiful-dnd`) or `@dnd-kit/core`.

---

## 🛠️ Tech Stack & React Requirements

- **Framework:** React JS (Vite build setup)
- **Styling:** TailwindCSS
- **State Management:** React Hooks (`useState`, `useContext`, `useEffect`) and the **Context API** for global task state management.
- **Drag & Drop:** `@hello-pangea/dnd` or `@dnd-kit`
- **Data Store:** `localStorage` (No external database or API needed)

---

---

## 📌 Project Roadmap & Status

### ✅ Completed Features
1. **Full Form Integration (`NewTaskModal.jsx`):** Captured form inputs with `useState` and connected `addTask()` to persist new tasks into `TaskContext` and `localStorage`.
2. **Inline Styled Validation Banner:** Replaced browser `alert()` with a custom red `AlertCircle` warning badge inside the sticky note modal.
3. **Hover Delete Button (`Board.jsx`):** Added a smooth hover trash icon (`Trash2`) on task cards using Tailwind `group-hover:opacity-100` that triggers `deleteTask(task.id)`.
4. **Smart Badges & Friendly Date Formatting:** Conditional badge rendering for empty fields and formatted ISO dates to friendly text (e.g., `Aug 26`).

### ⏳ Planned Next Steps
1. **Popup Modal Color Redesign:** Update input field backgrounds in [`NewTaskModal.jsx`](file:///e:/Fullstack%20Project/GUVI%20Project/Submit%20Project_%20GUVI/Kanban%20Board/src/components/NewTaskModal.jsx) from white to a soft matching yellow sticky-note tint (`bg-yellow-100/70` / `bg-amber-100/50`).
2. **Archive System:** Create an "Archive" section/folder to store completed tasks so the *Done* column stays clean and organized.