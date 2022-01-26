import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.jobs = [];
    this.StudentJobs = [];
    makeObservable(this, {
      jobs: observable,
      numItems: computed,
      addJobsFromDB: action,
    });
  }

  get numItems() {
    return this.jobs.length;
  }
  addJobsFromDB = async () => {
    let majd = "61f026b72a694eebcf65cc62";
    let result = await axios.get(`http://localhost:8888/students/${majd}/jobs`);
    this.StudentJobs = result.data;
  };
  getStudentJobs = () => {
    return this.StudentJobs;
  };
}
