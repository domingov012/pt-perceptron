import axios from "axios";
import { useEffect, useState } from "react";
import Task from "../components/Task";
import UpdateForm from "../components/UpdateForm";

export default function TasksLayout() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getTasks() {
      const tasks = await axios
        .get("http://127.0.0.1:8000/tasks/")
        .then((response) => response.data);

      setTasks(tasks);
    }
    getTasks();
  }, []);

  async function createNewTask(event) {
    event.preventDefault();
    setIsLoading(true);

    const newTaskTitle = event.target.title.value;

    await axios
      .post("http://localhost:8000/new-task/", {
        title: newTaskTitle,
      })
      .then((response) => {
        console.log(response.data);
        setTasks([...tasks, response.data]);
      });

    setIsLoading(false);
    event.target.title.value = "";
  }

  return (
    <>
      <div className="main-task">
        <h1>Tasks</h1>
        <div className="task-container scrollbar-hidden">
          {tasks.map((task) => (
            <Task
              key={task.id}
              title={task.title}
              status={task.status}
              creationDate={task.created_at}
              onClickAction={() => setSelectedTask(task)}
            />
          ))}
        </div>
      </div>
      <div className="details-container">
        <div className="form-container">
          <h1>Add task +</h1>
          <form onSubmit={createNewTask}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
            <button type="submit" className="btn">
              {!isLoading ? "Save" : "Saving..."}
            </button>
          </form>
        </div>
        <div className="form-container">
          <h2>Task Details</h2>
          {selectedTask ? (
            <UpdateForm
              task={selectedTask}
              dependency={selectedTask}
              updateTasks={setTasks}
            />
          ) : (
            <p>Select a task</p>
          )}
        </div>
      </div>
    </>
  );
}
