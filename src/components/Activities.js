import "./Components.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import UpdateActivityForm from "./UpdateActivityForm";

const Activities = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const activities = props.activities;
  const setActivities = props.setActivities;
  const [newActivity, setNewActivity] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setNewActivity("");
    setActivityDescription("");

    const response = await fetch(`${baseUrl}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        name: newActivity,
        description: activityDescription,
      }),
    });
    const info = await response.json();

    if (info.error) {
      console.log(info.error);
      return setErrorMessage(info.error);
    }
    props.getActivities();
  };

  return (
    <>
      <h1 className="page_title">Activities</h1>
      <div className="addActivity">
        {isLoggedIn && (
          <div>
            {" "}
            <h2>Add New Activity</h2>{" "}
            <form onSubmit={handleSubmit}>
              <input
                className="addActivityInput"
                placeholder="Enter activity name"
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                required
              ></input>
              <input
                className="addActivityInput"
                type="text"
                size="50"
                placeholder="Enter activity description"
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
              ></input>
              <button className="addActivityButton">Add New Activity!</button>
              <p style={{ color: "red" }}>{errorMessage}</p>
            </form>
          </div>
        )}
      </div>
      <div className="activity_results">
        {activities.map((activity) => {
          return (
            <div key={activity.id} className="activity">
              <div>
                <span style={{ fontWeight: "bold" }}>{activity.name} </span>
                <span> -- {activity.description}</span>
              </div>

              <UpdateActivityForm
                activity={activity}
                token={props.token}
                setErrorMessage={setErrorMessage}
                getActivities={props.getActivities}
              ></UpdateActivityForm>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Activities;
