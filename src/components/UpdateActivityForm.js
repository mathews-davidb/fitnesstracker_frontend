import { useState } from "react";
import { baseUrl } from "../App";
import "./Components.css";

const UpdateActivityForm = (props) => {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const updateActivity = async (e) => {
    e.preventDefault();
    props.setErrorMessage("");
    const response = await fetch(`${baseUrl}/activities/${props.activity.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        name: updatedName,
        description: updatedDescription,
      }),
    });
    const info = await response.json();
    if (info.error) {
      console.log(info.error);
      return props.setErrorMessage(info.error);
    }
    console.log(info);
    props.getActivities();
    setUpdatedName("");
    setUpdatedDescription("");
    setShowForm(false);
  };

  return (
    <>
      <div className="myRoutinesFunctions">
        <button
          style={{ width: "80px" }}
          onClick={() => {
            if (showForm) {
              setShowForm(false);
            } else {
              setShowForm(true);
            }
          }}
        >
          Update
        </button>
        <span></span>
      </div>
      {showForm && (
        <span>
          <br></br>
          <form onSubmit={updateActivity}>
            <label>Update Activity: </label>
            <input
              style={{ marginTop: "5px" }}
              className="addActivityInput"
              placeholder="Enter activity name"
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              required
            ></input>
            <input
              style={{ marginTop: "5px" }}
              className="addActivityInput"
              type="text"
              placeholder="Enteractivity description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            ></input>
            <button style={{ marginTop: "5px" }} className="addActivityButton">
              Update Activity!
            </button>
            <p style={{ color: "red" }}>{props.errorMessage}</p>
          </form>
        </span>
      )}
    </>
  );
};

export default UpdateActivityForm;
