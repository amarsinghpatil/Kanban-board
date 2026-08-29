# 📋 Sticky-Notes Kanban Board

A modern, responsive, and interactive Kanban-style task management web application built with **React 19**, **Tailwind CSS v4**, and **`@hello-pangea/dnd`**. Features a custom warm sticky-note aesthetic, real-time drag-and-drop mechanics, inline modal task editing, local storage persistence, and a dedicated task archive system.

---

## 🌐 Live Demo

🔗 **Live Application:** [View Live Kanban Board](https://kanban-board-one-sable.vercel.app/) *(Powered by Vercel)*

---

## ✨ Features

- 🖐️ **Drag & Drop Interactions:** Smoothly move tasks between **To do**, **In-Progress**, and **Done** columns powered by `@hello-pangea/dnd`.
- ✏️ **Inline Task Editing:** Click any task card to open an interactive modal to edit title, description, priority, due date, and tags.
- 📦 **Archive Folder System:** Keep your *Done* column clean by archiving completed tasks into a dedicated Archive Folder with restore capabilities.
- 🎨 **Warm Sticky-Note Aesthetic:** Custom color palette with amber/yellow sticky-note cards, priority badges, tag chips, and custom scrollbars.
- 📱 **Responsive Grid Layout:** 3-column CSS Grid layout with pinned headers and independent vertical scrolling zones.
- 💾 **LocalStorage Persistence:** State automatically synchronizes with browser `localStorage` so tasks persist across reloads.
- ⚠️ **Inline Validation Banners:** User-friendly inline warning banners for input validation without intrusive browser alerts.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Drag & Drop:** [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)
- **State Management:** React Context API & Custom Hooks (`useTask`)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/kanban-board.git
   cd "kanban-board"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` in your browser.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
