import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from "../../API/userManager";
import exerciseShape from '../../helpers/propz/exerciseShape';
import muscleGroupData from '../../helpers/data/muscleGroupData';
import exerciseData from '../../helpers/data/exerciseData'

import { createBrowserHistory as history} from 'history';

class ExerciseEdit extends React.Component {
  static propTypes = {
    addExercise: PropTypes.func,
    setCancelAdd: PropTypes.func,
    exerciseToUpdate: exerciseShape.exerciseShape,
    editMode: PropTypes.bool,
    updateExercise: PropTypes.func,
    exercise: exerciseShape.exerciseShape,
    setEdtMode: PropTypes.func,
    exerciseId: PropTypes.number
  }

    state = {
        exercise: {},
        exerciseName: undefined,
        exerciseMuscleGroup: undefined,
        mGroups: [],
    }

    componentDidMount() {
      const { match: { params } } = this.props;

      muscleGroupData.getAllMuscleGroups()
      .then(data => {
          let groups = data.map(group => {
            return {value: group.id, display: group.name}
          });
          this.setState({
            mGroups: [{value: 0, display: '(Select muscle group)'}].concat(groups)
          });
        })

       const exerciseid = `${params.id}`
      exerciseData.getSingleExercise(parseInt(exerciseid))
      .then((response) => {
        let exercise = response;
        this.setState({ exercise: exercise, exerciseName: exercise.name, exerciseMuscleGroup: exercise.muscleGroupId })
      })

    }
  
    updateExerciseEvent = (e) => {
      const { match: { params } } = this.props;
      const currentUser = getUser();
      const exerciseToUpdate = this.state.exercise;
      e.preventDefault();
      const updatedExercise = {
        Id: parseInt(params.id),
        Name: this.state.exerciseName,
        MuscleGroupId: this.state.exerciseMuscleGroup,
        UserId: currentUser.id,
      };
      console.log(updatedExercise);
      exerciseData.updateExercise(exerciseToUpdate.id, updatedExercise);
      exerciseData.getAllExercises();
      this.props.history.push('/api/Exercises');
      this.setState({ exerciseName: '', exerciseMuscleGroup: '' });
    }

    nameChange = (e) => {
      e.preventDefault();
      this.setState({ exerciseName: e.target.value });
    }
  
    muscleGroupChange = (e) => {
      e.preventDefault();
      this.setState({ exerciseMuscleGroup: parseInt(e.target.value) });
    }

    render() {
      
        return (
          <form className='col-6 offset-3 ExerciseForm'>
          <div className="form-group">
            <label htmlFor="exercise-name">Exercise Name:</label>
            <input
              type="text"
              className="form-control"
              id="exercise-name"
              placeholder="Enter exercise name"
              value={this.state.exerciseName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exercise-muscleGroup">Exercise Muscle Group:</label>
            <select value={this.state.exerciseMuscleGroup} onChange={this.muscleGroupChange}>
              {this.state.mGroups.map((group) => <option key={group.value} value={group.value}>{group.display}</option>)}
            </select>
          </div>
          <button className="btn btn-warning m-2" onClick={this.updateExerciseEvent}>Update Exercise</button>
          <button className="btn btn-danger m-2" onClick={this.setCancelAdd}>Cancel</button>
        </form>
        );
    }
}

export default ExerciseEdit;
