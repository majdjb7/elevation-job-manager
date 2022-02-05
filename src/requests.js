import axios from "axios";

const requests = {
  fetchAdminAPI: `http://localhost:8888/admin`,
};
export const filterProcessesByCohortName = async (cohortName) => {
  let result = await axios.get(
    `${requests.fetchAdminAPI}/cohorts/${cohortName}`
  );
  return result.data;
};
export const getTotalWorkersFromDB = async (cohortName) => {
  let result = await axios.get(
    `${requests.fetchAdminAPI}/cohorts/${cohortName}`
  );

  return result.data;
};
export const testing = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello");
    }, 1000);
  });
};

export default requests;
