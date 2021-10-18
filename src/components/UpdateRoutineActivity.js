import { useState } from "react";
import { baseUrl } from "../App";
import "./Components.css";
import UpdateActivityForm from "./UpdateActivityForm";

const UpdateRoutineActivity = (props) => {
  const [routineActivityId, setRoutineActivityId] = useState("");
  const [count2, setCount2] = useState("");
  const [duration2, setDuration2] = useState("");
  const [showForm, setShowForm] = useState(false);

  const updateRoutineActivity = async (e) => {
    e.preventDefault();
    props.setErrorMessage("");

    console.log(props.routine);
    console.log(routineActivityId);
    console.log(props.token);

    const response = await fetch(
      `${baseUrl}/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          count: count2,
          duration: duration2,
        }),
      }
    );
    const info = await response.json();
    if (info.error) {
      console.log(info.error);
      return props.setErrorMessage(info.error);
    }

    props.getMyRoutines();
    setCount2("");
    setDuration2("");
    setShowForm(false);
  };

  return (
    <>
      <button
        style={{ marginRight: "10px" }}
        onClick={() => {
          if (showForm) {
            setShowForm(false);
          } else {
            setShowForm(true);
          }
        }}
      >
        Update Activity
      </button>
      {showForm && (
        <span>
          <br></br>
          <form onSubmit={updateRoutineActivity}>
            <label>Update Activity: </label>
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
            <input
              style={{ marginLeft: "10px" }}
              type="text"
              value={count2}
              placeholder="Count"
              onChange={(e) => setCount2(e.target.value)}
              required
            ></input>
            <input
              style={{ marginLeft: "10px" }}
              type="text"
              placeholder="Duration"
              value={duration2}
              onChange={(e) => setDuration2(e.target.value)}
            ></input>
            <button
              className="addActivityButton "
              style={{ marginLeft: "10px" }}
            >
              Update Activity!
            </button>
            <p style={{ color: "red" }}>{props.errorMessage}</p>
          </form>
        </span>
      )}
    </>
  );
};

export default UpdateRoutineActivity;
