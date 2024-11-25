import { redirect, useNavigate } from "react-router-dom";
import Task from "./Task";

export default function Epic({ epic }) {
  let navigate = useNavigate();

  const numberOfTasks = epic.tasks.length;
  const tasksCompleted = epic.tasks.filter((task) => task.status === "done");

  return (
    <div className="epic-card" onClick={() => navigate(`/epics/${epic.id}`)}>
      <h2>{epic.title}</h2>
      <div>
        {tasksCompleted.length} / {numberOfTasks} tasks completed
      </div>
    </div>
  );
}
