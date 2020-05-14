import React from 'react'
import { getUser } from '../../API/userManager';
import userWorkoutData from '../../helpers/data/userWorkoutData';
import './WorkoutQueue.scss';

import { createBrowserHistory as history} from 'history';

class WorkoutQueue extends React.Component {

    state = {
    userWorkouts: []
    }

    componentDidMount() {
        const currentUser = getUser();
        const incompleteWorkouts = [];
        userWorkoutData.getUserWorkouts(currentUser.id)
        .then((workouts) => {
            if (workouts != undefined) {
                workouts.forEach((workout) => {
                    if (workout.dateCompleted == null) {
                        incompleteWorkouts.push(workout)
                    }
                })
                
            }
            this.setState({ userWorkouts: incompleteWorkouts})
        })
        .catch((errOnWorkoutQueue) => console.error(errOnWorkoutQueue))
    }

    removeFromUserQueue = (e) => {
        e.preventDefault();
        const uwId = e.target.id
        userWorkoutData.deleteUserWorkout(uwId);
        
    }

    completeWorkout = (e) => {
        e.preventDefault();
        const currentUser = getUser();
        const uwId = e.target.id
        const date = new Date();
        const updatedUW = {
            id: parseInt(uwId),
            userId: currentUser.id,
            workoutId: parseInt(e.target.parentElement.id),
            dateCompleted: date
        }
        // console.log(updatedUW.dateCompleted)
        userWorkoutData.updateUserWorkout(uwId, updatedUW)
        
    }

    render () {
        const { userWorkouts } = this.state;
        const currentUser = getUser();
        return (
            <div>
                <h1>Hi, {currentUser.firstName}!</h1>
                <h2>These are your queued workouts.</h2>
                <div className="q-workouts-container d-flex flex-row flex-wrap justify-content-between">
                    {userWorkouts.map((workout) => 
                    <div id={workout.workoutId} key={workout.id} workout={workout} className="card q-workout-card">
                        <p>{workout.workout.name}</p>
                        <p>Category: {workout.workout.category.name}</p>
                        <button className="btn btn-danger" id={workout.id} onClick={this.removeFromUserQueue}>Remove from queue</button>
                        <button className="btn btn-info" id={workout.id} workout={workout.workoutId} onClick={this.completeWorkout}>Mark as complete</button>
                    </div>)}
                </div>
            </div>
        )
    }
}

export default WorkoutQueue;