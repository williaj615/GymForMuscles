import React from 'react';
import workoutShape from '../../helpers/propz/workoutShape';
import workoutData from '../../helpers/data/workoutData';
import workoutExerciseData from '../../helpers/data/workoutExerciseData';
import { getUser } from '../../API/userManager';
import userWorkoutData from '../../helpers/data/userWorkoutData';

class SingleWorkout extends React.Component {
    static propTypes = {
        
    }

    state = {
        workout: {},
        workoutExercises: [],
        workoutName: '',
        workoutCategory: ''
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        const workoutid = `${params.id}`
        workoutData.getSingleWorkout(parseInt(workoutid))
        .then((response) => {
            let workout = response;
            this.setState({ workout: workout, workoutName: workout.name, workoutCategory: workout.category.name})
        })

        workoutExerciseData.getWExercisesByWorkoutId(workoutid)
        .then((response) => {
            this.setState({ workoutExercises: response})
        })
        
    }

    addToUserQueue = (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;

        const workoutid = `${params.id}`
        const currentUser = getUser();
        const newUserWorkout = {
            userId: currentUser.id,
            workoutId: parseInt(workoutid)
        }
        userWorkoutData.createUserWorkout(newUserWorkout);
        console.log(currentUser.id)
    }

    render() {
        const { workoutName, workoutExercises, workoutCategory } = this.state;
        return (
        <div className="wexercise-container">
            <h1>{workoutName}</h1>
            <p>Category: {workoutCategory}</p>
            <div id="wexercise-card-holder" className="d-flex flex-row flex-wrap justify-content-around">
                {workoutExercises.map((exercise) => (<div key={exercise.exercise.id} className="card">
                <p>{exercise.exercise.name}</p>
                </div>))}
            </div>
            <button className="btn btn-dark" onClick={this.addToUserQueue}>Add to my queue</button>
        </div>
        )
        
    }
}

export default SingleWorkout;