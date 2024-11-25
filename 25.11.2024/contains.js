import BASE_URL, { endpoints } from "./home.js";

async function deleteDataById(endpoint, id) {
    try {
      const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
async function getAllData(endpoint) {
    try {
        const response = await axios(`${BASE_URL}/${endpoint}`);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

export { getAllData,deleteDataById}