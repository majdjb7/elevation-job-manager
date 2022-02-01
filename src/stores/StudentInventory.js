import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.StudentJobs = [];
    this.firstName = '';
    this.isLoggedIn = false;
    makeObservable(this, {
      firstName: observable,
      StudentJobs: observable,
      isLoggedIn: observable,
      numItems: computed,
      checkUserLoggedIn: action,
      setLogin: action,
      logout: action,
      addJobsFromDB: action,
    });
    this.addJobsFromDB();
  }
  get numItems() {
    return this.StudentJobs.length;
  }
  addJobsFromDB = async () => {
    // this.StudentJobs = [];
    let majd = "61f6ab5115cb71811bc607d3";
    let result = await axios.get(`http://localhost:8888/student/jobs/${majd}`);
    this.StudentJobs = result.data;
  };

  setLogin = () => {
    this.isLoggedIn = true;
  }

  checkUserLoggedIn = async () => {
    const response = await fetch('http://localhost:8888/auth/user', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    console.log("Res: ", response)
    const content = await response.json();
    this.firstName = content.firstName;
    if(response.status != 401) {
      this.setLogin()

    }
  }

  logout = async () => {
    await fetch('http://localhost:8888/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    this.firstName = '';
    this.isLoggedIn = false;
  }

  edditStatusForStudent = async (jobId, status) => {
    const res = await axios.post(
      "http://localhost:8888/student/jobs/status/" + jobId + "/interviews",
      { status }
    );
    this.addJobsFromDB();
  };
}