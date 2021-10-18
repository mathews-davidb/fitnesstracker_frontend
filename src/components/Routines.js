import "./Components.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { act } from "react-dom/test-utils";

const Routines = (props) => {
  const [routines, setRoutines] = useState([]);

  const getRoutines = async (e) => {
    const response = await fetch(`${baseUrl}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await response.json();
    setRoutines(info);
  };

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <>
      <h1 className="page_title">Routines</h1>
      <div className="routine_results">
        {routines.map((routine) => {
          if (routine.isPublic) {
            return (
              <div key={routine.id}>
                <div className="routine">
                  <span style={{ fontWeight: "bold" }}>{routine.name} </span>
                  <br></br>
                  <span> by {routine.creatorName}</span>
                  <br></br>
                  <span>Goal: {routine.goal} </span>
                  <br></br>
                  <br></br>
                  <div>Activities: </div>
                  {routine.activities.map((activity) => {
                    return (
                      <div>
                        {" "}
                        - {activity.name}
                        <li>Description - {activity.description}</li>
                        <li>Count - {activity.count}</li>
                        <li>Duration - {activity.duration}</li>
                      </div>
                    );
                  })}
                </div>
                <br></br>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Routines;
