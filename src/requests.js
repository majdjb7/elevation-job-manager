import axios from "axios";

const requests = {
  fetchAdminAPI: `/admin`,
};
export const filterProcessesByCohortName = async (cohortName) => {
  let result = await axios.get(
    `${requests.fetchAdminAPI}/cohorts/${cohortName}`
  );
  return result.data;
};
export const getAllStudentsProcesses = async () => {
  let allStudentsProcesses = [];
  try {
    let jobs = await axios.get(`${requests.fetchAdminAPI}/allJobs`);
    allStudentsProcesses = [...jobs.data];
  } catch (error) {
    console.log(error);
  }
  return allStudentsProcesses;
};
export const testing = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello");
    }, 1000);
  });
};

export default requests;
