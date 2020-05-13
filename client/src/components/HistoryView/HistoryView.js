import React from 'react';
import { getUser } from '../../API/userManager';
import userWorkoutData from '../../helpers/data/userWorkoutData';
import { Link } from 'react-router-dom';

class HistoryView extends React.Component {
    state = {
        completedUserWorkouts: []
    }

    componentDidMount() {
        const currentUser = getUser();
        const completedWorkouts = []
        userWorkoutData.getUserWorkouts(currentUser.id)
        .then((workouts) => {
            workouts.forEach((workout) => {
                if (workout.dateCompleted !== null) {
                    completedWorkouts.push(workout)
                }
            })
            this.setState({ completedUserWorkouts: completedWorkouts})
        })
    }

    render() {
        const { completedUserWorkouts } = this.state
        return (
            <div>
                {completedUserWorkouts.map((userworkout) => (
                    <div>
                        <p>{userworkout.workout.name}</p>
                        <p>{userworkout.dateCompleted}</p>
                        <Link to={`/api/Workouts/${userworkout.workoutId}`}>View Workout Details</Link>
                    </div>
                ))}
            </div>
        )
    }
}

export default HistoryView;