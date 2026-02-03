import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Task } from "../App";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, title: string, description?: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdateTask
}) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
        You&apos;re all caught up. Add a new task to get started.
      </div>
    );
  }

  return (
    <motion.ul layout className="flex flex-col gap-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
            onUpdate={(title, description) => onUpdateTask(task.id, title, description)}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default TaskList;
