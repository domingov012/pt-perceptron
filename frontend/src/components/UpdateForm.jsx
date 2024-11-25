import axios from "axios";
import { useEffect, useState } from "react";

export default function UpdateForm({ task, dependency, updateTasks }) {
  const [selectedState, setSelectedState] = useState(task.status);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedState(task.status);
  }, [dependency]);

  async function deleteTask(event) {
    event.preventDefault();
    setIsLoading(true);
    await axios
      .delete(`http://localhost:8000/tasks/${task.id}/`)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);

        // update tasklist in real time
        updateTasks((prev) => prev.filter((t) => t.id !== task.id));
      });
  }

  async function updateTask(event) {
    event.preventDefault();
    setIsLoading(true);
    const newTitle =
      event.target.title.value == "" ? task.title : event.target.title.value;

    await axios
      .patch(`http://localhost:8000/tasks/${task.id}/`, {
        title: newTitle,
        status: selectedState,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);

        // update tasklist in real time
        updateTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, title: newTitle, status: selectedState }
              : t
          )
        );
      });
  }

  return (
    <form onSubmit={updateTask}>
      <h2>{task.title}</h2>

      <div className="flex">
        <div
          onClick={() => setSelectedState("to-do")}
          className={`state-option-${selectedState == "to-do"}`}
        >
          To-Do
        </div>
        <div
          onClick={() => setSelectedState("in-progress")}
          className={`state-option-${selectedState == "in-progress"}`}
        >
          In Progress
        </div>
        <div
          onClick={() => setSelectedState("block")}
          className={`state-option-${selectedState == "block"}`}
        >
          Blocked
        </div>
        <div
          onClick={() => setSelectedState("done")}
          className={`state-option-${selectedState == "done"}`}
        >
          Done
        </div>
      </div>
      <label htmlFor="title">Edit title</label>
      <input type="text" id="title" name="title" placeholder={task.title} />
      <button type="submit" className="btn">
        {!isLoading ? "Save" : "Saving..."}
      </button>

      <button onClick={deleteTask} className="btn delete-btn">
        {!isLoading ? "Delete" : "Deleting..."}
      </button>
    </form>
  );
}
