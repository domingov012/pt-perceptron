import axios from "axios";
import { useEffect, useState } from "react";
import Task from "../components/Task";
import UpdateForm from "../components/UpdateForm";
import Epic from "../components/Epics";
import { redirect } from "react-router-dom";

export default function EpicsLayout() {
  const [epics, setEpics] = useState([]);
  const [tasksAvailable, setTasks] = useState([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [selectedEpic, setSelectedEpic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getEpics() {
      const epics = await axios
        .get("http://127.0.0.1:8000/epics/")
        .then((response) => response.data);

      setEpics(epics);
      console.log(epics);
    }
    async function getTasks() {
      const tasks = await axios
        .get("http://127.0.0.1:8000/tasks/")
        .then((response) => response.data);

      setTasks(tasks);
      console.log(tasks);
    }

    // get info from backend
    getEpics();
    getTasks();
  }, []);

  function selectTask(event) {
    const taskId = event.target.value;
    console.log(taskId);
    setSelectedTaskIds([...selectedTaskIds, taskId]);
  }

  async function createNewEpic(event) {
    event.preventDefault();
    setIsLoading(true);

    const newEpicTitle = event.target.title.value;

    await axios
      .post("http://localhost:8000/new-epic/", {
        title: newEpicTitle,
        tasks: selectedTaskIds,
      })
      .then((response) => {
        console.log(response.data);
        setEpics([...epics, response.data]);
        setSelectedTaskIds([]);
      });

    setIsLoading(false);
    event.target.title.value = "";
  }

  return (
    <>
      <div className="main-task">
        <h1>Epics</h1>
        <div className="task-container scrollbar-hidden">
          {epics.map((epic) => (
            <Epic key={epic.id} epic={epic} />
          ))}
        </div>
      </div>
      <div className="details-container">
        <div className="form-container">
          <h1>Add Epic +</h1>
          <form onSubmit={createNewEpic}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />

            <div className="selected-tasks-id">
              {selectedTaskIds.map((taskId) => {
                const task = tasksAvailable.find((t) => t.id == taskId);
                return (
                  <div
                    className={`task-selected-for-epic ${task.status}`}
                    key={task.id}
                  >
                    <p>{task.title}</p>
                    <div>{task.status}</div>
                    <div
                      onClick={() =>
                        setSelectedTaskIds((prev) =>
                          [...prev].filter((id) => id !== taskId)
                        )
                      }
                    >
                      X
                    </div>
                  </div>
                );
              })}
            </div>

            <select
              id="dropdown"
              value={""}
              onChange={(event) => {
                setSelectedTaskIds((prev) => [...prev, event.target.value]);
              }}
            >
              <option value="" disabled>
                Select tasks for epic
              </option>
              {tasksAvailable.map((task) => {
                if (selectedTaskIds.includes(task.id.toString())) return null;
                return (
                  <option key={task.id} value={task.id}>
                    {task.title} ({task.status})
                  </option>
                );
              })}
            </select>

            <button type="submit" className="btn">
              {!isLoading ? "Save" : "Saving..."}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
