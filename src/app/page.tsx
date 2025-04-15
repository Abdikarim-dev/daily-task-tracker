"use client";
import {
  isThisMonthTask,
  isThisWeekTask,
  isTodayTask,
  isYesterdayTask,
} from "@/components/dateHelpers";
import TaskList from "@/components/TaskList";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  createdAt: Date;
}

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return;
    setIsLoading(true);
    const newTask: Task = {
      id: Date.now(),
      title: task,
      createdAt: new Date(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setTask("");
    setIsLoading(false);
  };

  return (
    <div className="m-2">
      <h1 className="text-2xl font-bold">Welcome to the Task Manager</h1>
      <p className="mt-4 text-gray-700">
        Manage your tasks efficiently and effectively.
      </p>
      {/* Add your components here */}
      <div className="mt-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {isLoading ? "Adding..." : "Add Task"}
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="m-2">
          <h3 className="text-lg font-medium">Today's Tasks</h3>
          <TaskList tasks={tasks} setTasks={setTasks} filter={isTodayTask} />
        </div>
        <div className="m-2">
          <h3 className="text-lg font-medium">Yesterday's Tasks</h3>
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            filter={isYesterdayTask}
          />
        </div>
        <div className="m-2">
          <h3 className="text-lg font-medium">This Week's Tasks</h3>
          <TaskList tasks={tasks} setTasks={setTasks} filter={isThisWeekTask} />
        </div>
        <div className="m-2">
          <h3 className="text-lg font-medium">This Month's Tasks</h3>
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            filter={isThisMonthTask}
          />
        </div>
        <div className="mx-2 my-8">
          <h3 className="text-lg font-medium">All Tasks</h3>
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            filter={() => true} // No filter for all tasks
            // filter={() => (task: Task) => true} // No filter for all tasks
          />
        </div>
      </div>
    </div>
  );
}
