import { useState } from "react";
import { baseUrl } from "../App";
import "./Components.css";

const UpdateRoutineForm = (props) => {
  const [updatedRoutine, setUpdatedRoutine] = useState("");
  const [updatedGoal, setUpdatedGoal] = useState("");
  const [showFormUpdate, setShowFormUpdate] = useState(false);

  const updateRoutine = async (e) => {
    e.preventDefault();
    console.log(updatedRoutine, updatedGoal);
    const response = await fetch(`${baseUrl}/routines/${props.routine.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        name: updatedRoutine,
        goal: updatedGoal,
      }),
    });
    const info = await response.json();
    props.getMyRoutines();
    setUpdatedGoal("");
    setUpdatedRoutine("");
    setShowFormUpdate(false);
  };

  return (
    <>
      <button
        style={{ marginRight: "10px" }}
        onClick={() => {
          if (showFormUpdate) {
            setShowFormUpdate(false);
          } else {
            setShowFormUpdate(true);
          }
        }}
      >
        Update
      </button>
      {showFormUpdate && (
        <span>
          <br></br>
          <form onSubmit={updateRoutine}>
            <label>Update Routine: </label>
            <input
              className="addActivityInput"
              placeholder="Enter routine name"
              type="text"
              value={updatedRoutine}
              onChange={(e) => setUpdatedRoutine(e.target.value)}
              required
            ></input>
            <input
              className="addActivityInput"
              type="text"
              size="50"
              placeholder="Enter routine goal"
              value={updatedGoal}
              onChange={(e) => setUpdatedGoal(e.target.value)}
              required
            ></input>
            <button className="addActivityButton">Update Routine!</button>
            <p style={{ color: "red" }}>{props.errorMessage}</p>
          </form>
        </span>
      )}
    </>
  );
};

export default UpdateRoutineForm;
