import axios from 'axios';

const getAllMuscleGroups = () => new Promise((resolve, reject) => {
    axios.get(`/api/muscleGroups`)
      .then((result) => {
        const allMGObj = result.data;
        const muscleGroups = [];
        if (allMGObj != null) {
          Object.keys(allMGObj).forEach((muscleGroupId) => {
            const newMuscleGroup = allMGObj[muscleGroupId];
            muscleGroups.push(newMuscleGroup);
          });
        }
        resolve(muscleGroups);
      })
      .catch((err) => {
        reject(err);
      });
  });

  export default { getAllMuscleGroups };