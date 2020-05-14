import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUser, removeUser } from "../../API/userManager";
import './Header.scss';


function Header({ history }) {
  const user = getUser();

  const logout = () => {
    removeUser();
    history.push("/login");
  };

  return (
    <nav className="header">
      <ul className="nav-items">
        {user ? (
          <>
            <Link className="nav-item nav-link" to="/api/Exercises">Exercise Library</Link>
            <Link className="nav-item nav-link" to="/api/Workouts">Workout Library</Link>
            <Link className="nav-item nav-link" to="/WorkoutHistory">Your Workout History</Link>
            <li className="nav-item">Hello {user.firstName}</li>
            <li className="nav-item" onClick={logout}>
              Log out
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default withRouter(Header);
