import React from 'react';
import PropTypes from 'prop-types';
import exerciseShape from '../../helpers/propz/exerciseShape';
import './Exercise.scss';
import { getUser } from '../../API/userManager';
import { Link, withRouter } from 'react-router-dom';

class Exercise extends React.Component {
static propTypes = {
  exercise: exerciseShape.exerciseShape,
  removeSingleExercise: PropTypes.func,
  setEditMode: PropTypes.func,
  setExerciseToUpdate: PropTypes.func,

}

setEditModeEvent = (e) => {
  const { setEditMode } = this.props;
  e.preventDefault();
  setEditMode(true);
  // setExerciseToUpdate(exercise);
}

removeExerciseEvent = (e) => {
  e.preventDefault();
  const { removeSingleExercise, exercise } = this.props;
  removeSingleExercise(exercise.id);
}

render() {
  const currentUser = getUser();
  const { exercise } = this.props;
  return (
    <div className="card exercise-card col-3 m-3">
      <h3>{exercise.name}</h3>
      <p>Target: {exercise.muscleGroup.name}</p>
      {/* <button className="delete-button btn btn-danger mb-2" onClick={this.removePlayerEvent}>Remove Player</button> */}
      {
      (exercise.userId === currentUser.id) ? 
      <Link  className="edit-button btn btn-info" to={`/api/Exercises/${exercise.id}/edit`} exercise={exercise} exerciseid={`${exercise.id}`} >Edit Exercise </Link>
      : <empty></empty>}
    </div>
  );
}
}

export default withRouter(Exercise);
