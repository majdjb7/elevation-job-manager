import axios from "axios";

const requests = {
  fetchAdminAPI: `http://localhost:8888/admin`,
};
export const sortPerCohortName = async (cohortName) => {
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

export const sum = (a, b) => {
  return a + b;
};

export default requests;
