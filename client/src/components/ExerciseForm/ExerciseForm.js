import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from "../../API/userManager";
import exerciseShape from '../../helpers/propz/exerciseShape';
import muscleGroupData from '../../helpers/data/muscleGroupData';
import exerciseData from '../../helpers/data/exerciseData';

class ExerciseForm extends React.Component {
  static propTypes = {
    addExercise: PropTypes.func,
    setCancelAdd: PropTypes.func,
    exerciseToUpdate: exerciseShape.exerciseShape,
    editMode: PropTypes.bool,
    updateExercise: PropTypes.func,
    exercise: exerciseShape.exerciseShape,
    setEdtMode: PropTypes.func
  
  }

  state = {
    exerciseName: '',
    exerciseMuscleGroup: '',
    mGroups: [],
    
    
    

  }

  componentDidMount() {
    
    muscleGroupData.getAllMuscleGroups()
    .then(data => {
        let groups = data.map(group => {
          return {value: group.id, display: group.name}
        });
        this.setState({
          mGroups: [{value: 0, display: '(Select muscle group)'}].concat(groups)
        });
    })
  }

  saveExerciseEvent = (e) => {
    const { addExercise } = this.props;
    const currentUser = getUser();

    e.preventDefault();
    const newExercise = {
      name: this.state.exerciseName,
      muscleGroupId: parseInt(this.state.exerciseMuscleGroup),
      userId: currentUser.Id
    };
    addExercise(newExercise);
    this.setState({ exerciseName: '', exerciseMuscleGroup: ''});
  }


  nameChange = (e) => {
    e.preventDefault();
    this.setState({ exerciseName: e.target.value });
  }

  muscleGroupChange = (e) => {
    // const muscleGroups = muscleGroupData.getAllMuscleGroups();
    e.preventDefault();
    // const selectedMG = muscleGroups.filter((x) => x.Id === e.target.value)
    this.setState({ exerciseMuscleGroup: e.target.value });
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
      <button className="btn btn-warning m-2" onClick={this.saveExerciseEvent}>Save Exercise</button>
      <button className="btn btn-danger m-2" onClick={this.setCancelAdd}>Cancel</button>
    </form>
    );
  }
}

export default ExerciseForm;