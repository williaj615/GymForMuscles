import React from 'react';
import exerciseData from '../../helpers/data/exerciseData';

class DeleteConfirm extends React.Component {
    state = {
        exercise: {},
        exercises: []
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        const exerciseId = `${params.id}`
        exerciseData.getSingleExercise(exerciseId)
        .then((exercise) => {
            this.setState({ exercise })
        })

    }

    getExercises = () => {
        exerciseData.getAllExercises()
          .then((exercises) => {
            this.setState({ exercises });
          })
          .catch((errOnExerciseLibrary) => console.error({ errOnExerciseLibrary }));
      }
    
    removeSingleExerciseEvent = (e) => {
        const { match: { params } } = this.props;
        const exerciseId = `${params.id}`
        exerciseData.removeExercise(exerciseId)
          .then(() => {
            this.getExercises();
          })
          .catch((errOnRemoveExercise) => console.error(errOnRemoveExercise));
    }

    render() {
        const { exercise } = this.state;
        return (
            <div>
                <h1>Are you sure you want to delete the following exercise?</h1>
                <h3>{exercise.name}</h3>
                <button onClick={this.removeSingleExerciseEvent}>Yes, delete this.</button>
                <button>No, just kidding!</button>
            </div>
        )
    }
}

export default DeleteConfirm;