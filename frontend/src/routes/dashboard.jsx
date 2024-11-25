import axios from "axios";
import { useEffect, useState } from "react";
import TaskChart from "../components/TaskChart";
import Task from "../components/Task";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [recentPendingTasks, setRecentPendingTasks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://127.0.0.1:8000/dashboard-info/`).then((res) => {
        console.log(res.data);
        if (res.data?.message === "No tasks found") return;
        setData(res.data);
      });
    }
    async function fetchRecentPendingTasks() {
      await axios
        .get(`http://127.0.0.1:8000/recent-pending-tasks/`)
        .then((res) => {
          console.log(res.data);
          setRecentPendingTasks(res.data);
        });
    }

    // fetch the data
    fetchData();
    fetchRecentPendingTasks();
  }, []);

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        {data.length === 0 ? (
          <div>No data found</div>
        ) : (
          <TaskChart data={data} />
        )}
      </div>
      <div className="main-task">
        <h1>Recent Pending Tasks</h1>
        <div className="task-container scrollbar-hidden">
          {recentPendingTasks.length > 0 ? (
            recentPendingTasks.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                status={task.status}
                creationDate={task.created_at}
              />
            ))
          ) : (
            <div>No recent pending tasks found</div>
          )}
        </div>
      </div>
    </>
  );
}
