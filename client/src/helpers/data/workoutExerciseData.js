import axios from 'axios';


const getWExercisesByWorkoutId = (workoutId) => new Promise((resolve, reject) => {
  axios.get(`/api/WorkoutExercises?workoutId=${workoutId}`)
    .then((result) => {
      const allWExercisesObj = result.data;
      const wExercises = [];
      if (allWExercisesObj != null) {
        Object.keys(allWExercisesObj).forEach((wExerciseId) => {
          const newWExercise = allWExercisesObj[wExerciseId];
          wExercises.push(newWExercise);
        });
      }
      resolve(wExercises);
    })
    .catch((err) => {
      reject(err);
    });
});

const createWExercise = (newWex) => axios.post(`/api/WorkoutExercises`, newWex)

export default { getWExercisesByWorkoutId, createWExercise };