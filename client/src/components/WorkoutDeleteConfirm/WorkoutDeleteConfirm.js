import React from 'react';
import workoutData from '../../helpers/data/workoutData';
import workoutExerciseData from '../../helpers/data/workoutExerciseData';

class WorkoutDeleteConfirm extends React.Component {
    state = {
        workout: {},
        workouts: []
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        const workoutId = `${params.id}`
        workoutData.getSingleWorkout(workoutId)
        .then((workout) => {
            this.setState({ workout })
        })

    }
    
    getWorkouts = () => {
        workoutData.getAllWorkouts()
        .then((workouts) => {
            this.setState({ workouts });
        })
        .catch((errOnWorkoutLibrary) => console.error(errOnWorkoutLibrary))
    }

    removeSingleworkoutEvent = (e) => {
        const { match: { params } } = this.props;
        const workoutId = `${params.id}`
        workoutExerciseData.getWExercisesByWorkoutId(workoutId)
        .then((exercises) => {
            exercises.forEach((ex) => 
            { workoutExerciseData.deleteWExercise(ex.id) })
        })
        workoutData.removeWorkout(workoutId)
          .then(() => {
            this.getworkouts();
          })
          .catch((errOnRemoveworkout) => console.error(errOnRemoveworkout));
    }

    render() {
        const { workout } = this.state;
        return (
            <div>
                <h1>Are you sure you want to delete the following workout?</h1>
                <h3>{workout.name}</h3>
                <button onClick={this.removeSingleworkoutEvent}>Yes, delete this.</button>
                <button>No, just kidding!</button>
            </div>
        )
    }
}

export default WorkoutDeleteConfirm;