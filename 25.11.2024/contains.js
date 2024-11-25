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
// async function deleteDataById(endpoint, id) {
//   try {
//     const response = await axios.delete(`${BASE_URL}/${endpoints}/${id}`);
//     return response;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// async function addNewData(endpoint, payload) {
//   try {
//     const response = await axios.post(`${BASE_URL}/${endpoint}`, payload);
//     return response;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// async function editDataById(endpoint, id, payload) {
//   try {
//     const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, payload);
//     return response;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
export { getAllData,deleteDataById}
// ,addNewData,editDataById