import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.StudentJobs = [];
    this.studentData = {};
    this.studentProfileJobs = [];
    this.firstName = '';
    this.isLoggedIn = false;
    this.studentID = '';

    makeObservable(this, {
      firstName: observable,
      StudentJobs: observable,
      isLoggedIn: observable,
      studentData: observable,
      studentProfileJobs: observable,
      studentID: observable,
      numItems: computed,
      checkUserLoggedIn: action,
      setLogin: action,
      setStudentID: action,
      logout: action,
      addJobsFromDB: action,
      getStudentData: action

    });
    this.addJobsFromDB();
  }
  get numItems() {
    return this.StudentJobs.length;
  }
  addJobsFromDB = async () => {
    try {
      let result = await axios.get(`http://localhost:8888/student/jobs/${this.studentID}`);
      this.StudentJobs = result.data;
    } catch (error) {
      console.log("Something wrong")
    }
  };
  getStudentData = async (id) => {
    const studentData = await axios.get(`http://localhost:8888/student/data/${id}`);
    this.studentData = studentData.data
    let result = await axios.get(`http://localhost:8888/student/jobs/${id}`);
    this.StudentJobs = result.data;

  }

  setLogin = () => {
    this.isLoggedIn = true;
  };

  setStudentID = (id) => {
    this.studentID = id;
    console.log(this.studentID)
  }

  checkUserLoggedIn = async () => {
    const response = await fetch("http://localhost:8888/auth/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    this.firstName = content.firstName;
    if (response.status != 401) {
      this.setLogin()
    }
    console.log(this.studentID)
  }

  logout = async () => {
    await fetch("http://localhost:8888/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    this.firstName = '';
    this.isLoggedIn = false;
    this.studentID = '';
  }

  edditStatusForStudent = async (jobId, status) => {
    const res = await axios.post(
      "http://localhost:8888/student/jobs/status/" + jobId + "/interviews",
      { status }
    );
    this.addJobsFromDB();
  };
}
