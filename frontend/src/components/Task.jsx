export default function Task({
  title,
  status,
  completed,
  creationDate,
  onClickAction,
}) {
  // parse creationDate to date object
  const creationDateDate = new Date(creationDate);

  let statusIndicator;
  if (status == "to-do") statusIndicator = "To-Do";
  if (status == "in-progress") statusIndicator = "In Progress";
  if (status == "done") statusIndicator = "Done";
  if (status == "blocked") statusIndicator = "Blocked";

  return (
    <div className="task-card" onClick={onClickAction}>
      <div className={`task-info-container ${status}`}>
        <p>{statusIndicator}</p>
      </div>
      <div className="task-title-container">
        <h2>{title}</h2>
        <p>
          {creationDateDate.getDate()}/{creationDateDate.getMonth()}/
          {creationDateDate.getFullYear()}
        </p>
      </div>
    </div>
  );
}
