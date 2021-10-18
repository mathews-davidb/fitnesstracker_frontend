import { useEffect, useState } from "react";
import { Route } from "react-router";
import { baseUrl } from "../App";
import AddActivityForm from "./AddActivityForm";
import "./Components.css";
import DeleteRoutineActivity from "./DeleteRoutineActivities";
import UpdateRoutine from "./UpdateRoutine";
import UpdateRoutineActivity from "./UpdateRoutineActivity";

const MyRoutines = (props) => {
  const [newRoutine, setNewRoutine] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [myRoutines, setMyRoutines] = useState([]);
  const [routinePublic, setRoutinePublic] = useState(null);
  const activities = props.activities;

  //===========================================================

  const getMyRoutines = async () => {
    const response = await fetch(
      `${baseUrl}/users/${props.user.username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    const info = await response.json();
    if (info) {
      console.log(info);
      setMyRoutines(info);
    } else {
      setMyRoutines([]);
    }
  };

  //===========================================================

  useEffect(() => {
    if (!props.user) {
      return;
    }
    getMyRoutines();
  }, [props.user]);

  //===========================================================

  const addNewRoutine = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setNewRoutine("");
    setRoutineGoal("");
    const response = await fetch(`${baseUrl}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        name: newRoutine,
        goal: routineGoal,
        isPublic: routinePublic,
      }),
    });
    const info = await response.json();
    if (info.error) {
      console.log(info.error);
      return setErrorMessage(info.error);
    }
    getMyRoutines();
  };

  //===========================================================

  const routineDelete = async (routineId) => {
    const response = await fetch(`${baseUrl}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    const info = await response.json();
    getMyRoutines();
  };

  //===========================================================

  //===========================================================

  //===========================================================

  return (
    <>
      <h1 className="page_title">My Routines</h1>
      <div className="addRoutine">
        <div>
          {" "}
          <h2>Add New Routine</h2>{" "}
          <form onSubmit={addNewRoutine}>
            <input
              className="addActivityInput"
              placeholder="Enter routine name"
              type="text"
              value={newRoutine}
              onChange={(e) => setNewRoutine(e.target.value)}
              required
            ></input>
            <input
              className="addActivityInput"
              type="text"
              size="50"
              placeholder="Enter routine goal"
              value={routineGoal}
              onChange={(e) => setRoutineGoal(e.target.value)}
            ></input>
            <input
              value={routinePublic}
              type="checkbox"
              onChange={(e) => {
                !routinePublic
                  ? setRoutinePublic(true)
                  : setRoutinePublic(false);
              }}
            />
            <label> Make Routine Public? </label>
            <button style={{ marginLeft: "10px" }}>Add New Routine!</button>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </form>
        </div>
      </div>
      {
        <div className="myRoutine_results">
          {myRoutines.map((routine) => {
            return (
              <div key={routine.id}>
                <div className="routine">
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {routine.name} |{" "}
                  </span>
                  <span>Goal: {routine.goal} </span>
                  <br></br>
                  <br></br>
                  <span> Activities: </span>
                  {routine.activities.map((activity) => {
                    return (
                      <span>
                        {activity.name}(count-{activity.count}, duration-
                        {activity.duration}){" "}
                      </span>
                    );
                  })}
                  <div className="myRoutinesFunctions">
                    <span></span>

                    <span></span>

                    <span></span>
                  </div>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      routineDelete(routine.id);
                    }}
                  >
                    Delete
                  </button>

                  <UpdateRoutine
                    setMyRoutines={setMyRoutines}
                    myRoutines={myRoutines}
                    routine={routine}
                    errorMessage={errorMessage}
                    getMyRoutines={getMyRoutines}
                    token={props.token}
                  ></UpdateRoutine>

                  <AddActivityForm
                    activities={activities}
                    routine={routine}
                    setErrorMessage={setErrorMessage}
                    getMyRoutines={getMyRoutines}
                    token={props.token}
                  ></AddActivityForm>
                  <UpdateRoutineActivity
                    routine={routine}
                    setErrorMessage={setErrorMessage}
                    getMyRoutines={getMyRoutines}
                    token={props.token}
                  ></UpdateRoutineActivity>
                  <DeleteRoutineActivity
                    routine={routine}
                    setErrorMessage={setErrorMessage}
                    getMyRoutines={getMyRoutines}
                    token={props.token}
                  ></DeleteRoutineActivity>
                </div>
                <br></br>
              </div>
            );
          })}
        </div>
      }
    </>
  );
};

export default MyRoutines;
