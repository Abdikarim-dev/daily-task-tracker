import { subDays } from "date-fns";
import { formatDate, timeAgo } from "./dateHelpers";

interface Task {
  id: number;
  title: string;
  createdAt: Date;
}
export default function TaskList({
  tasks,
  filter,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filter: (date: Date) => boolean;
}) {
  const subtractOneDay = (id: number) => {
    const updatedTasks = [...tasks];

    const taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return; // Task not found

    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      createdAt: subDays(updatedTasks[taskIndex].createdAt, 1),
    };

    // Update the state with the modified tasks array
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => filter(task.createdAt));

  return (
    <div>
      {filteredTasks.map((task) => (
        <div
          className="mb-2.5 flex gap-6 justify-between items-center bg-gray-100 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          key={task.id}
        >
          <div className=" flex-1 ">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p>
              <strong>{formatDate(task.createdAt)}</strong>
            </p>
            <p>
              <strong>{timeAgo(task.createdAt)}</strong>
            </p>
          </div>
          <button onClick={() => subtractOneDay(task.id)}>
            Subtract 1 day
          </button>
        </div>
      ))}
    </div>
  );
}
