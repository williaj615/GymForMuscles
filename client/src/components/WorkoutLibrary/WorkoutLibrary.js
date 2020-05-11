import React from 'react';
import workoutData from '../../helpers/data/workoutData';
import WorkoutCard from '../WorkoutCard/WorkoutCard';

class WorkoutLibrary extends React.Component {
    state = {
        workouts: []
    }

    getWorkouts = () => {
        workoutData.getAllWorkouts()
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
      <button className="btn btn-secondary m-3">Add an Exercise</button>
      <div id="Workouts-container" className="d-flex flex-row flex-wrap justify-content-around">
        {workouts.map((workout) => (<WorkoutCard key={workout.id} workout={workout} removeSingleExercise={this.removeSingleExercise}/>))}
      </div>
    </div>
        )
    }
}

export default WorkoutLibrary;