import React, { useState } from "react";
import { motion } from "framer-motion";
import { Task } from "../App";

type TaskItemProps = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (title: string, description?: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");

  // Update local edit state when the task changes externally.
  React.useEffect(() => {
    setTitle(task.title);
    setDescription(task.description ?? "");
  }, [task.description, task.title]);

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }
    onUpdate(title.trim(), description.trim() || undefined);
    setIsEditing(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-800/70"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onToggle}
            className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border transition ${
              task.completed
                ? "border-emerald-400 bg-emerald-400 text-white"
                : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900"
            }`}
            aria-label={task.completed ? "Mark task as active" : "Mark task as completed"}
          >
            {task.completed ? "✓" : ""}
          </button>
          <div>
            <h3
              className={`text-base font-semibold transition ${
                task.completed
                  ? "text-slate-400 line-through dark:text-slate-500"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`mt-1 text-sm ${
                  task.completed ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-300"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-500 transition hover:border-rose-300 hover:text-rose-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal for editing tasks */}
      {isEditing && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-inner dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Title
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Description
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.li>
  );
};

export default TaskItem;
