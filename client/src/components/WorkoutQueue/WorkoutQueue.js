import React from 'react'
import { getUser } from '../../API/userManager';
import userWorkoutData from '../../helpers/data/userWorkoutData';


class WorkoutQueue extends React.Component {

    state = {
    userWorkouts: []
    }

    componentDidMount() {
        const currentUser = getUser();

        userWorkoutData.getUserWorkouts(currentUser.id)
        .then((workouts) => {
            if (workouts != undefined) {
                this.setState({ userWorkouts: workouts})
            }
            else {}
        })
        .catch((errOnWorkoutQueue) => console.error(errOnWorkoutQueue))
    }

    removeFromUserQueue = (e) => {
        e.preventDefault();
        const uwId = e.target.id
        userWorkoutData.deleteUserWorkout(uwId);
    }

    render () {
        const { userWorkouts } = this.state;
        return (
            <div>
                <h1>These are your queued workouts.</h1>
                <div>
                    {userWorkouts.map((workout) => 
                    <div key={workout.id} workout={workout} className="card q-workout-card">
                        <p>{workout.workout.name}</p>
                        <p>Category: {workout.workout.category.name}</p>
                        <button id={workout.id} onClick={this.removeFromUserQueue}>Remove from queue</button>
                    </div>)}
                </div>
            </div>
        )
    }
}

export default WorkoutQueue;