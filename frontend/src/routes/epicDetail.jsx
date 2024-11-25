import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Task from "../components/Task";

export default function EpicDetails() {
  const { epicId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [epic, setEpic] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function getEpic() {
      await axios
        .get(`http://127.0.0.1:8000/epics/${epicId}/`)
        .then((response) => {
          setTasks(response.data.epic.tasks);
          setEpic(response.data.epic);
          setTotalTasks(response.data.total_tasks);
          setCompletedTasks(response.data.completed_tasks);
        });
    }
    getEpic();
  }, []);

  async function removeTaskFromEpic(taskId) {
    await axios
      .patch(`http://127.0.0.1:8000/epics/${epicId}/`, {
        title: epic.title,
        tasks: tasks.filter((task) => task.id !== taskId),
      })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data.epic.tasks);
        setCompletedTasks(response.data.completed_tasks);
        setTotalTasks(response.data.total_tasks);
      });
  }

  async function createNewTaskForEpic(event) {
    event.preventDefault();
    await axios
      .post(`http://127.0.0.1:8000/epics/${epicId}/new-task/`, {
        title: event.target.title.value,
      })
      .then((response) => {
        console.log(response.data);
        setTasks((prev) => [...prev, response.data.new_task]);
        setCompletedTasks(response.data.completed_tasks);
        setTotalTasks(response.data.total_tasks);
        event.target.title.value = "";
      });
  }

  async function deleteEpic() {
    await axios
      .delete(`http://127.0.0.1:8000/epics/${epicId}/`)
      .then((response) => {
        console.log(response.data);
        navigate("/epics");
      });
  }

  return (
    <>
      <div className="main-task">
        <div className="flex aligned">
          <h1>{epic.title}</h1>
          <h3>
            {completedTasks} / {totalTasks} tasks completed
          </h3>
        </div>
        <h2>Tasks</h2>
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <Task
                title={task.title}
                status={task.status}
                completed={task.completed}
                creationDate={task.created_at}
              />
              <button
                className="delete-btn"
                onClick={() => removeTaskFromEpic(task.id)}
              >
                Unlink
              </button>
            </div>
          ))}
        </div>
        <button className="delete-btn" onClick={deleteEpic}>
          Delete Epic
        </button>
      </div>
      <div className="form-container">
        <h3>Add task to this epic</h3>
        <form onSubmit={createNewTaskForEpic}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
          <button type="submit" className="btn">
            {!isLoading ? "Save" : "Saving..."}
          </button>
        </form>
      </div>
    </>
  );
}
