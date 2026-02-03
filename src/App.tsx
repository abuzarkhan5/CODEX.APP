import React, { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

const filters = ["All", "Active", "Completed"] as const;
export type FilterOption = (typeof filters)[number];

const motivationalQuotes = [
  "Small steps every day add up to big results.",
  "Focus on progress, not perfection.",
  "Your future self will thank you.",
  "Done is better than perfect."
];

const App: React.FC = () => {
  // Persist tasks between sessions.
  const [tasks, setTasks] = useLocalStorage<Task[]>("codex.tasks", []);
  // Persist theme preference between sessions.
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("codex.theme.dark", false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const today = useMemo(() => new Date(), []);
  const quote = useMemo(() => {
    const index = Math.floor(today.getDate() % motivationalQuotes.length);
    return motivationalQuotes[index];
  }, [today]);

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "Active":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [activeFilter, tasks]);

  const handleAddTask = (title: string, description?: string) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: string, title: string, description?: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title, description } : task))
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  // Sync Tailwind dark mode class to document root.
  React.useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-surface-light px-4 py-10 text-slate-900 transition-colors duration-300 dark:bg-surface-dark dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {/* Header with date, quote, and theme toggle */}
        <header className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur dark:bg-slate-900/70 dark:shadow-slate-900/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                {today.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                })}
              </p>
              <h1 className="mt-2 text-3xl font-semibold">Today&apos;s Focus</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{quote}</p>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span>{darkMode ? "Dark" : "Light"} mode</span>
              <span className="text-lg" aria-hidden>
                {darkMode ? "🌙" : "☀️"}
              </span>
            </button>
          </div>
        </header>

        {/* Task input panel */}
        <section className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 dark:bg-slate-900">
          <TaskInput onAddTask={handleAddTask} />
        </section>

        {/* Filter + list section */}
        <section className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{tasks.length} total</span>
              <span>{completedCount} completed</span>
              <button
                type="button"
                onClick={handleClearCompleted}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                Clear completed
              </button>
            </div>
          </div>

          <div className="mt-6">
            <TaskList
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
