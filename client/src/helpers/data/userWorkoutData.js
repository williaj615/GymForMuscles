import axios from 'axios';

const getUserWorkouts = (userid) => new Promise((resolve, reject) => {
    axios.get(`/api/UserWorkouts?userId=${userid}`)
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

const createUserWorkout = (newUW) =>  axios.post(`/api/UserWorkouts`, newUW)
const deleteUserWorkout = (uwId) => axios.delete(`/api/UserWorkouts/${uwId}`)

export default { getUserWorkouts, createUserWorkout, deleteUserWorkout };