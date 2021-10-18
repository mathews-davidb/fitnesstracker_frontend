import { useState } from "react";
import { baseUrl } from "../App";
import "./Components.css";

const AddActivityForm = (props) => {
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [showFormAdd, setShowFormAdd] = useState(false);

  const addActivity = async (e) => {
    e.preventDefault();
    props.setErrorMessage("");

    const response = await fetch(
      `${baseUrl}/routines/${props.routine.id}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    );
    const info = await response.json();
    if (info.error) {
      console.log(info.error);
      return props.setErrorMessage(info.error);
    }
    
    props.getMyRoutines();
    setCount("");
    setDuration("");
    setShowFormAdd(false);
  };

  return (
    <>
      <button
        style={{ marginRight: "10px" }}
        onClick={() => {
          if (showFormAdd) {
            setShowFormAdd(false);
          } else {
            setShowFormAdd(true);
          }
        }}
      >
        Add Activity
      </button>
      {showFormAdd && (
        <span>
          <br></br>
          <form onSubmit={addActivity}>
            <label>Add Activity: </label>
            <select
              name="activities"
              value={props.activities.id}
              onChange={(e) => setActivityId(e.target.value)}
            >
              <option value="activity">Activity</option>
              {props.activities.map((activity, index) => (
                <option value={activity.id} key={index}>
                  {activity.name}
                </option>
              ))}
            </select>
            <input
              style={{ marginLeft: "10px" }}
              type="text"
              value={count}
              placeholder="Count"
              onChange={(e) => setCount(e.target.value)}
              required
            ></input>
            <input
              style={{ marginLeft: "10px" }}
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            ></input>
            <button
              className="addActivityButton "
              style={{ marginLeft: "10px" }}
            >
              Add Activity!
            </button>
            <p style={{ color: "red" }}>{props.errorMessage}</p>
          </form>
        </span>
      )}
    </>
  );
};

export default AddActivityForm;
