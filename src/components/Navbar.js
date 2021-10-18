import "./Components.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const setUser = props.setUser;
  const setToken = props.setToken;

  return (
    <div className="navbar">
      <h1 id="navbar_logo">Fitness-Tracker</h1>
      <div id="navbar_links">
        <Link
          style={{
            textDecoration: "none",
            marginRight: "25px",
            backgroundColor: "#3B945E",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
          to="/"
        >
          Home{"  "}
        </Link>
        {isLoggedIn && (
          <Link
            style={{
              textDecoration: "none",
              marginRight: "25px",
              backgroundColor: "#3B945E",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
            to="/my-routines"
          >
            My Routines{"  "}
          </Link>
        )}
        <Link
          style={{
            textDecoration: "none",
            marginRight: "25px",
            backgroundColor: "#3B945E",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
          to="/routines"
        >
          Routines{"  "}
        </Link>
        <Link
          style={{
            textDecoration: "none",
            marginRight: "25px",
            backgroundColor: "#3B945E",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
          to="/activities"
        >
          Activities{"  "}
        </Link>
        {!isLoggedIn && (
          <Link
            style={{
              textDecoration: "none",
              marginRight: "25px",
              backgroundColor: "#3B945E",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
            to="/login"
          >
            Login{"  "}
          </Link>
        )}
        {isLoggedIn && (
          <Link
            style={{
              textDecoration: "none",
              marginRight: "25px",
              backgroundColor: "#3B945E",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
            to="/login"
            onClick={() => {
              localStorage.setItem("token", "");
              setIsLoggedIn(false);
              setUser(null);
              setToken("");
            }}
          >
            Logout{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
