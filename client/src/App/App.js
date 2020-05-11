import React from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import ApplicationViews from "../components/ApplicationViews";
import Header from "../components/MyNavBar/Header";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { getUser } from "../API/userManager";
import "./App.css";
import ExerciseLibrary from "../components/ExerciseLibrary/ExerciseLibrary";
import ExerciseEdit from '../components/ExerciseEdit/ExerciseEdit';
import WorkoutLibrary from '../components/WorkoutLibrary/WorkoutLibrary';
import SingleWorkout from '../components/SingleWorkout/SingleWorkout';

class App extends React.Component {

  render() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route
          render={() =>
            getUser() ? <ApplicationViews /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/login"
          render={() => (getUser() ? <Redirect to="/" /> : <Login />)}
        />
        <Route
          exact
          path="/register"
          render={() => (getUser() ? <Redirect to="/" /> : <Register />)}
        />
        <Route
          exact
          path="/api/Exercises"
          render={() => (getUser() ? <ExerciseLibrary /> : <Redirect to="/login" />)}
        />
        <Route
          path="/api/Exercises/:id/edit" component={ExerciseEdit} />
        
        <Route
          exact
          path="/api/Workouts"
          render={() => (getUser() ? <WorkoutLibrary /> : <Redirect to="/login" />)}
        />
        <Route
        path="/api/Workouts/:id"  component={SingleWorkout} /> 
      </Router>
    </div>
  );
}
}

export default App;
