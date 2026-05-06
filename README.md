# Task Manager App

A modern, responsive task management web application built with **React (Vite)**, **TailwindCSS**, **Shadcn/UI components**, and **React Router**. 

The app allows users to:
- Create new tasks with title and description
- View all tasks in an organized list with statistics
- Update existing tasks
- Delete tasks
- Search and filter tasks by title or description
- All data is persisted in browser localStorage and survives page refreshes

## ✨ Features

- ✅ Create, Read, Update, Delete tasks
- ✅ Search tasks by title or description
- ✅ View task statistics (total, completed, pending)
- ✅ Data persists across browser sessions
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Form validation

## 🏗️ Architecture

**Folder Structure:**
```
src/
├── components/          # Reusable UI components
│   ├── TaskForm.jsx    # Task form component
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── ui/             # Base UI components (Button, Input, etc.)
├── pages/              # Page components
│   ├── TasksPage.jsx   # Tasks list page
│   ├── TaskDetailPage.jsx # Edit task page
│   └── TaskCreatePage.jsx # Create task page
├── context/
│   └── TasksContext.jsx # Global task state (Context API)
├── hooks/
│   └── useTasks.js     # Custom hook to access context
├── services/
│   └── storageService.js # localStorage wrapper
├── layouts/
│   └── DashboardLayout.jsx # Main layout wrapper
└── App.jsx             # Routing
```

**Data Flow:**
1. Components call `useTasks()` hook → gets context
2. Context manages shared task state
3. storageService reads/writes to localStorage
4. All components sync automatically when data changes

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router 7** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework
- **Shadcn/UI** - Custom component library (Button, Input, Textarea, Checkbox, Dialog)
- **Context API** - State management
- **localStorage API** - Client-side data persistence

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run dev server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   ```

<img width="1900" height="862" alt="image" src="https://github.com/user-attachments/assets/6b53d38b-d1d0-426a-88ff-cc2cb83fefc3" />




