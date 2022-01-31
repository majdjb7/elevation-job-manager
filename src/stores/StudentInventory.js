import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.StudentJobs = [];
    this.name = '';
    makeObservable(this, {
      name: observable,
      StudentJobs: observable,
      numItems: computed,
      checkUserLoggedIn: action,
      logout: action,
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

  checkUserLoggedIn = async () => {
    const response = await fetch('http://localhost:8888/auth/user', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    const content = await response.json();
    this.name = content.name
  }

  logout = async () => {
    await fetch('http://localhost:8888/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    this.name = '';
}
}
