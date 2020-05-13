import React from 'react';
import workoutData from '../../helpers/data/workoutData';
import WorkoutCard from '../WorkoutCard/WorkoutCard';
import { Link } from 'react-router-dom';

class WorkoutLibrary extends React.Component {
    state = {
        workouts: [],
        query: ''
    }

    handleInputChange = () => {
        this.setState({
          query: this.search.value
        })
      }

    getWorkouts = () => {
        workoutData.getAllWorkouts(this.state.query)
        .then((workouts) => {
            this.setState({ workouts });
        })
        .catch((errOnWorkoutLibrary) => console.error(errOnWorkoutLibrary))
    }

    removeSingleWorkout = (workoutId) => {
        workoutData.removeWorkout(workoutId)
        .then(() => {
            this.getWorkouts();
        })
        .catch((errOnRemoveWorkout) => console.error(errOnRemoveWorkout))
    }


    componentDidMount() {
        this.getWorkouts();
    }

    render() {
        const { workouts } = this.state;
        return (
            <div>
                <form>
                <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    onKeyUp={this.getWorkouts}>
                </input>
                </form>
      <Link className="btn btn-secondary m-3" to="/Workouts/new">Create a new Workout</Link>
      <div id="Workouts-container" className="d-flex flex-row flex-wrap justify-content-around">
        {workouts.map((workout) => (<WorkoutCard key={workout.id} workout={workout} removeSingleExercise={this.removeSingleExercise}/>))}
      </div>
    </div>
        )
    }
}

export default WorkoutLibrary;