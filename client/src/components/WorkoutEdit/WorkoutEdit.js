import React from 'react';
import exerciseData from '../../helpers/data/exerciseData';
import workoutData from '../../helpers/data/workoutData';
import { getUser } from '../../API/userManager';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import categoryData from '../../helpers/data/categoryData';
import workoutExerciseData from '../../helpers/data/workoutExerciseData';

class WorkoutEdit extends React.Component {

state = {
    workout: {},
    exercises: [],
    selectedExercises: [],
    workoutName: '',
    workoutCategory: undefined,
    wCategories: []
}

componentDidMount() {
    const { match: { params } } = this.props;
    const aExercises = [];
    const workoutid = `${params.id}`
      workoutData.getSingleWorkout(parseInt(workoutid))
      .then((response) => {
        let workout = response;
        this.setState({ workout: workout, workoutName: workout.name, workoutCategory: workout.Category })
      })

    workoutExerciseData.getWExercisesByWorkoutId(workoutid)
    .then((exercises) => {
        // exercises.forEach((wexercise) => {
        //         aExercises.push(wexercise)
        // })
        let mem = exercises.map(x => {
            return {value: x.exercise.id, label: x.exercise.name}
        })
        this.setState({ selectedExercises: mem})
    })

    exerciseData.getAllExercises()
      .then(data => {
          let libraryExercises = data.map(exercise => {
            return {value: exercise.id, label: exercise.name}
          });
          this.setState({
            exercises: [{value: 0, label: '(Select exercises)'}].concat(libraryExercises)
          });
        })

    categoryData.getAllCategories()
    .then(data => {
        let categories = data.map(category => {
            return {value: category.id, display: category.name}
        });
        this.setState({
            wCategories: [{value: 0, display: '(Select category)'}].concat(categories)
        });
        })
}

nameChange = (e) => {
    
    this.setState({ workoutName: e.target.value });
}

categoryChange = (e) => {
    e.preventDefault();
    this.setState({ workoutCategory: parseInt(e.target.value) });
}



saveWorkoutEvent = (e) => {
    const currentUser = getUser();
    const { selectedExercises } = this.state;
    e.preventDefault();
    const newWorkout = {
      name: this.state.workoutName,
      categoryId: this.state.workoutCategory,
      userId: currentUser.id
    };
    workoutData.saveWorkout(newWorkout)
    .then((response) => {
        const createdWorkout = response.data;
        selectedExercises.forEach((exercise) => {
            const newWEx = {
                workoutId: createdWorkout.id,
                exerciseId: exercise.value
            }
            workoutExerciseData.createWExercise(newWEx);
        })
    })
    
}

cancelAdd = () => {
    this.setState({ exercises: [],
        selectedExercises: [],
        workoutName: '' })
}

getSelectedExercises = (selectedOptions) => {
    this.setState({ selectedExercises: selectedOptions })
}

componentWillUnmount() {
    this.setState({ exercises: [],
        selectedExercises: [],
        workoutName: '',
        workoutCategory: undefined,
        wCategories: []});
}

render() {
    const { exercises, selectedExercises, selectedOption } = this.state;

    return (
        <form className='col-6 offset-3 WorkoutForm'>
          <div className="form-group">
            <label htmlFor="workout-name">Workout Name:</label>
            <input
              type="text"
              className="form-control"
              id="workout-name"
              placeholder="Enter workout name"
              value={this.state.workoutName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
          <ReactMultiSelectCheckboxes 
          options={exercises}
          isMulti
          value={selectedExercises}
          onChange={this.getSelectedExercises}
           />
          </div>
          <div className="form-group">
            <label htmlFor="workout-category">Category:</label>
            <select id="workout-category" value={this.state.workoutCategory} onChange={this.categoryChange}> 
              {this.state.wCategories.map((category) => <option key={category.value} value={category.value}>{category.display}</option>)}
            </select>
          </div>
          <button className="btn btn-warning m-2" onClick={this.saveWorkoutEvent}>Save Workout</button>
          <button className="btn btn-danger m-2" onClick={this.setCancelAdd}>Cancel</button>
        </form>
    )
}
}

export default WorkoutEdit;