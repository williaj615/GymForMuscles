import React from 'react';
import exerciseData from '../../helpers/data/exerciseData';
import Exercise from '../Exercise/Exercise';
import ExerciseForm from '../ExerciseForm/ExerciseForm';


class ExerciseLibrary extends React.Component {
state = {
  exercises: [],
  displayExerciseForm: false,
  editMode: false,
  exerciseToUpdate: {},
}

getExercises = () => {
  exerciseData.getAllExercises()
    .then((exercises) => {
      this.setState({ exercises });
    })
    .catch((errOnExerciseLibrary) => console.error({ errOnExerciseLibrary }));
}

removeSingleExercise = (exerciseId) => {
  exerciseData.removeExercise(exerciseId)
    .then(() => {
      this.getExercises();
    })
    .catch((errOnRemoveExercise) => console.error(errOnRemoveExercise));
}

addExercise = (newExercise) => {
  exerciseData.saveExercise(newExercise)
    .then(() => {
      this.getExercises();
      this.setState({ displayExerciseForm: false });
    })
    .catch((errOnSaveExercise) => console.error(errOnSaveExercise));
}

updateExercise = (exerciseId, updatedExercise) => {
  exerciseData.updateExercise(exerciseId, updatedExercise)
    .then(() => {
      this.getExercises();
      this.setState({ editMode: false, displayExerciseForm: false });
    })
    .catch((errFromUpdateExercise) => console.error(errFromUpdateExercise));
}

setDisplayExerciseForm = () => {
  this.setState({ displayExerciseForm: true });
}

setCancelAdd = () => {
  this.setState({ displayExerciseForm: false });
}

setEditMode = (editMode) => {
  this.setState({ editMode, displayExerciseForm: true });
}

setExerciseToUpdate = (Exercise) => {
  this.setState({ ExerciseToUpdate: Exercise });
}

componentDidMount() {
  this.getExercises();
}

render() {
  const { editMode, ExerciseToUpdate } = this.state;
  return (
    <div>
      <button className="btn btn-secondary m-3" onClick={this.setDisplayExerciseForm}>Add an Exercise</button>
      { this.state.displayExerciseForm && (<ExerciseForm addExercise={this.addExercise} setCancelAdd={this.setCancelAdd} editMode={editMode} ExerciseToUpdate={ExerciseToUpdate} updateExercise={this.updateExercise}/>)}
      <div id="Exercises-container" className="d-flex flex-row flex-wrap justify-content-around">
        {this.state.exercises.map((exercise) => (<Exercise key={exercise.id} exercise={exercise} removeSingleExercise={this.removeSingleExercise} setEditMode={this.setEditMode} setExerciseToUpdate={this.setExerciseToUpdate} />))}
      </div>
    </div>
  );
}
}

export default ExerciseLibrary;