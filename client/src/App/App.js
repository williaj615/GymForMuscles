import React from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../components/MyNavBar/Header";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { getUser } from "../API/userManager";
import "./App.css";
import ExerciseLibrary from "../components/ExerciseLibrary/ExerciseLibrary";
import ExerciseEdit from '../components/ExerciseEdit/ExerciseEdit';
import WorkoutLibrary from '../components/WorkoutLibrary/WorkoutLibrary';
import SingleWorkout from '../components/SingleWorkout/SingleWorkout';
import Home from '../components/Home';
import WorkoutForm from '../components/WorkoutForm/WorkoutForm';
import WorkoutEdit from "../components/WorkoutEdit/WorkoutEdit";

class App extends React.Component {

  render() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route
          path="/Home"
          render={() =>
            getUser() ? <Home /> : <Redirect to="/login" />
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
          exact
          path="/Workouts/new"
          render={() => (getUser() ? <WorkoutForm /> : <Redirect to="/login" />)}
        />
        <Route
        path="/api/Workouts/:id"  component={SingleWorkout} /> 

        <Route
        path="/Workouts/:id/edit"  component={WorkoutEdit} />
      </Router>
    </div>
  );
}
}

export default App;
