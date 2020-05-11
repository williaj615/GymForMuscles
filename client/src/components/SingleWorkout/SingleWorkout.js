import React from 'react';
import workoutShape from '../../helpers/propz/workoutShape';
import workoutData from '../../helpers/data/workoutData';
import workoutExerciseData from '../../helpers/data/workoutExerciseData';

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
        </div>
        )
        
    }
}

export default SingleWorkout;