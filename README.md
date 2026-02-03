# Codex To-Do App

A clean, responsive To-Do app built with **React + TypeScript + Tailwind CSS**. It supports adding, editing, completing, deleting, filtering, and persisting tasks in localStorage, with smooth Framer Motion animations and a dark/light mode toggle.

## Features
- Add tasks with a title and optional description
- Inline edit via a focused modal panel
- Mark tasks complete with strikethrough styling
- Filter by All / Active / Completed
- Clear all completed tasks
- Persistent localStorage data
- Dark / light theme toggle (persisted)
- Framer Motion list animations
- Responsive, minimal UI

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- CRA (`react-scripts`)

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run the app
```bash
npm start
```

The app will open at `http://localhost:3000`.

## Build
```bash
npm run build
```

## Notes
If you are running this in a restricted environment, `npm install` may fail due to registry access. In that case, run the commands locally where registry access is available.
