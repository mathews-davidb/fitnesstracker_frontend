import { useState } from "react";
import { baseUrl } from "../App";
import "./Components.css";

const DeleteRoutineActivity = (props) => {
  const [routineActivityId, setRoutineActivityId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const deleteRoutineActivity = async (e) => {
    e.preventDefault();
    props.setErrorMessage("");

    const response = await fetch(
      `${baseUrl}/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    const info = await response.json();
    if (info.error) {
      console.log(info.error);
      return props.setErrorMessage(info.error);
    }

    props.getMyRoutines();
    setShowForm(false);
  };

  return (
    <>
      <button
        onClick={() => {
          if (showForm) {
            setShowForm(false);
          } else {
            setShowForm(true);
          }
        }}
      >
        Delete Activity
      </button>
      {showForm && (
        <span>
          <br></br>
          <form onSubmit={deleteRoutineActivity}>
            <label>Delete Activity: </label>
            <select
              name="activities"
              onChange={(e) => {
                console.log(e.target.value);
                setRoutineActivityId(e.target.value);
              }}
            >
              <option value="activity">Activity</option>
              {props.routine.activities.map((activity, index) => (
                <option value={activity.routineActivityId} key={index}>
                  {activity.name}
                </option>
              ))}
            </select>
            <button
              className="addActivityButton "
              style={{ marginLeft: "10px" }}
            >
              Delete Activity!
            </button>
            <p style={{ color: "red" }}>{props.errorMessage}</p>
          </form>
        </span>
      )}
    </>
  );
};

export default DeleteRoutineActivity;
