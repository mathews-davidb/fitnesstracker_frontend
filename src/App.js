import { useEffect, useState } from "react";
import { Route } from "react-router";
import "./App.css";
import Activities from "./components/Activities";
import Home from "./components/Home";
import Login from "./components/Login";
import MyRoutines from "./components/MyRoutines";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Routines from "./components/Routines";

export const baseUrl = "https://fitnesstrac-kr.herokuapp.com/api";

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  const getUser = async () => {
    if (!token) {
      return;
    }
    setIsLoggedIn(true);
    const response = await fetch(`${baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    setUser(info);
  };

  useEffect(() => {
    getUser();
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const getActivities = async (e) => {
    const response = await fetch(`${baseUrl}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await response.json();
    setActivities(info);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        setToken={setToken}
      />
      <Route exact path="/">
        {" "}
        <Home />
      </Route>
      <Route path="/routines">
        {" "}
        <Routines />
      </Route>
      <Route path="/my-routines">
        {" "}
        <MyRoutines token={token} user={user} activities={activities} />
      </Route>
      <Route path="/activities">
        {" "}
        <Activities
          isLoggedIn={isLoggedIn}
          token={token}
          activities={activities}
          setActivities={setActivities}
          getActivities={getActivities}
        />
      </Route>
      <Route path="/login">
        {" "}
        <Login
          token={token}
          setToken={setToken}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Route>
      <Route path="/register">
        {" "}
        <Register
          token={token}
          setToken={setToken}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Route>
    </div>
  );
}

export default App;
