import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.StudentJobs = [];
    makeObservable(this, {
      StudentJobs: observable,
      numItems: computed,
      addJobsFromDB: action,
    });
    this.addJobsFromDB();
  }
  get numItems() {
    return this.StudentJobs.length;
  }
  addJobsFromDB = async () => {
    let majd = "61f6ab5115cb71811bc607d3";
    let result = await axios.get(`http://localhost:8888/student/jobs/${majd}`);
    this.StudentJobs = result.data;
  };
}
