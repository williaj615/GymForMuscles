import React from 'react';
import PropTypes from 'prop-types';
import workoutShape from '../../helpers/propz/workoutShape';
import { getUser } from '../../API/userManager';
import { Link, withRouter } from 'react-router-dom';
import workoutData from '../../helpers/data/workoutData';
import exerciseData from '../../helpers/data/exerciseData';

class WorkoutCard extends React.Component {
   static propTypes = {
        workout: workoutShape.workoutShape,
        removeSingleWorkout: PropTypes.func
    }

    removeWorkoutEvent = (e) => {
        e.preventDefault();
        const { removeSingleWorkout, workout } = this.props;
        removeSingleWorkout(workout.id);
        workoutData.getAllWorkouts();
    }

    render() {
        const currentUser = getUser();
        const { workout } = this.props;
        return (
            <div className="card workout-card col-3 m-3">
            <h3>{workout.name}</h3>
            <p>{workout.category.name}</p>
            {
            (workout.userId === currentUser.id) ? 
            <Link  className="edit-button btn btn-info" to={`/api/Workouts/${workout.id}/edit`} workout={workout} workoutid={`${workout.id}`} >Edit Workout </Link>
            : <div></div>}
            {
            (workout.userId === currentUser.id) ? 
            <button className="delete-button btn btn-danger mb-2" onClick={this.removeWorkoutEvent}>Remove Workout</button>
            : <div></div>}
            </div>
        )
    }
}

export default WorkoutCard;