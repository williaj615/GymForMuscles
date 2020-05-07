import axios from 'axios';


const getAllExercises = (uid) => new Promise((resolve, reject) => {
  axios.get(`/api/exercises`)
    .then((result) => {
      const allExercisesObj = result.data;
      const exercises = [];
      if (allExercisesObj != null) {
        Object.keys(allExercisesObj).forEach((exerciseId) => {
          const newExercise = allExercisesObj[exerciseId];
          newExercise.id = exerciseId;
          exercises.push(newExercise);
        });
      }
      resolve(exercises);
    })
    .catch((err) => {
      reject(err);
    });
});


const saveExercise = (exerciseInfo) => axios.post(`localhost:5001/api/Exercises`, exerciseInfo);

const removeExercise = (exerciseId) => axios.delete(`localhost:5001/api/Exercises/${exerciseId}`);

const updateExercise = (exerciseId, updatedExercise) => axios.put(`localhost:5001s/api/Exercises/${exerciseId}`, updatedExercise);

export default {
  getAllExercises, saveExercise, removeExercise, updateExercise
};