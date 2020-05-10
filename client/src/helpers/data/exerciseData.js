import axios from 'axios';


const getAllExercises = () => new Promise((resolve, reject) => {
  axios.get(`/api/exercises`)
    .then((result) => {
      const allExercisesObj = result.data;
      const exercises = [];
      if (allExercisesObj != null) {
        Object.keys(allExercisesObj).forEach((exerciseId) => {
          const newExercise = allExercisesObj[exerciseId];
          exercises.push(newExercise);
        });
      }
      resolve(exercises);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleExercise = (exerciseId) => new Promise((resolve, reject) => {
  axios.get(`/api/exercises/${exerciseId}`)
  .then((result) => {
    resolve(result.data);
  })
  .catch((err) => {
    reject(err);
  });
});

const saveExercise = (exerciseInfo) => axios.post(`/api/exercises`, exerciseInfo);

const removeExercise = (exerciseId) => axios.delete(`localhost:5001/api/Exercises/${exerciseId}`);

const updateExercise = (exerciseId, updatedExercise) => axios.put(`/api/Exercises/${exerciseId}`, updatedExercise);

export default {
  getAllExercises, saveExercise, removeExercise, updateExercise, getSingleExercise
};