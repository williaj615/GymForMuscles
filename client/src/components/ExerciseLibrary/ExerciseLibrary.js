import React from 'react';
import exerciseData from '../../helpers/data/exerciseData';
import Exercise from '../Exercise/Exercise';
import ExerciseForm from '../ExerciseForm/ExerciseForm';
import ReactDOM from 'react-dom';
import './ExerciseLibrary.scss';


class ExerciseLibrary extends React.Component {
state = {
  exercises: [],
  displayExerciseForm: false,
  editMode: false,
  query: ''
}

handleInputChange = () => {
  this.setState({
    query: this.search.value
  })
}

getExercises = () => {
  exerciseData.getAllExercises(this.state.query)
    .then((exercises) => {
      this.setState({ exercises });
    })
    .catch((errOnExerciseLibrary) => console.error({ errOnExerciseLibrary }));
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

componentDidMount() {
  this.getExercises();
}

render() {
  const { editMode, exercises } = this.state;
  return (
    <div>
      <form>
       <input
         placeholder="Search for an exercise..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
         onKeyUp={this.getExercises}>
       </input>
       </form>
      <button className="btn btn-secondary m-3" onClick={this.setDisplayExerciseForm}>Add an Exercise</button>
      { this.state.displayExerciseForm && (<ExerciseForm addExercise={this.addExercise} setCancelAdd={this.setCancelAdd} editMode={editMode} updateExercise={this.updateExercise}/>)}
      <div id="Exercises-container" className="d-flex justify-content-around flex-wrap flex-row">
        {exercises.map((exercise) => (<Exercise key={exercise.id} exercise={exercise} setDisplayExerciseForm={this.state.setDisplayExerciseForm} removeSingleExercise={this.removeSingleExercise} setEditMode={this.setEditMode} />))}
      </div>
    </div>
  );
}
}

export default ExerciseLibrary;