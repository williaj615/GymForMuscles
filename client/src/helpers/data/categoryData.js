import axios from 'axios';

const getAllCategories = () => new Promise((resolve, reject) => {
    axios.get(`/api/categories`)
      .then((result) => {
        const allCategoriesObj = result.data;
        const categories = [];
        if (allCategoriesObj != null) {
          Object.keys(allCategoriesObj).forEach((categoryId) => {
            const newCategory = allCategoriesObj[categoryId];
            categories.push(newCategory);
          });
        }
        resolve(categories);
      })
      .catch((err) => {
        reject(err);
      });
  });

  export default { getAllCategories };