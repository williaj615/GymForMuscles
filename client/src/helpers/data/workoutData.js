import axios from 'axios';


const getAllWorkouts = (query) => new Promise((resolve, reject) => {
  axios.get(`/api/workouts?query=${query}`)
    .then((result) => {
      const allWorkoutsObj = result.data;
      const workouts = [];
      if (allWorkoutsObj != null) {
        Object.keys(allWorkoutsObj).forEach((workoutId) => {
          const newWorkout = allWorkoutsObj[workoutId];
          workouts.push(newWorkout);
        });
      }
      resolve(workouts);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleWorkout = (workoutId) => new Promise((resolve, reject) => {
  axios.get(`/api/workouts/${workoutId}`)
  .then((result) => {
    resolve(result.data);
  })
  .catch((err) => {
    reject(err);
  });
});

const saveWorkout = (workoutInfo) => axios.post(`/api/workouts`, workoutInfo);

const removeWorkout = (workoutId) => axios.delete(`/api/workouts/${workoutId}`);

const updateWorkout = (workoutId, updatedWorkout) => axios.put(`/api/workouts/${workoutId}`, updatedWorkout);

export default {
  getAllWorkouts, saveWorkout, removeWorkout, updateWorkout, getSingleWorkout
};