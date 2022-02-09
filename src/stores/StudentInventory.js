import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.StudentJobs = [];
    this.studentData = {};
    this.studentProfileJobs = [];
    this.firstName = "";
    this.isLoggedIn = false;
    this.studentID = "";
    this.isAdmin = false;

    makeObservable(this, {
      firstName: observable,
      StudentJobs: observable,
      isLoggedIn: observable,
      isAdmin: observable,
      studentData: observable,
      studentProfileJobs: observable,
      studentID: observable,
      numItems: computed,
      checkUserLoggedIn: action,
      setUserType: action,
      setLogin: action,
      setStudentID: action,
      logout: action,
      addJobsFromDB: action,
      getStudentData: action,
      deleteProcesses:action,
    });
  }
  get numItems() {
    return this.StudentJobs.length;
  }
  addJobsFromDB = async () => {
    try {
      if (this.isAdmin == false) {
        let result = await axios.get(`/student/jobs/${this.studentID}`)
        
        this.StudentJobs = result.data;
        console.log(result)
        console.log(result.data)
        console.log(this.StudentJobs)
      }
    } catch (error) {
      console.log("Something wrong");
    }
  };

  setUserType = (type) => {
    this.isAdmin = type;
  };

  getStudentData = async (id) => {
    const studentData = await axios.get(`/student/data/${id}`);
    this.studentData = studentData.data;
    let result = await axios.get(`/student/jobs/${id}`);
    this.StudentJobs = result.data;
  };

  setLogin = () => {
    this.isLoggedIn = true;
  };

  setStudentID = (id) => {
    this.studentID = id;
    console.log(this.studentID);
  };

  checkUserLoggedIn = async () => {
    const response = await fetch("/auth/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    this.firstName = content.firstName;
    this.studentID = content._id;
    if (response.status != 401) {
      this.setLogin();
    }

  };

  logout = async () => {
    await fetch("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    this.firstName = "";
    this.isLoggedIn = false;
    this.studentID = "";
  };

  edditStatusForStudent = async (jobId, status) => {
    const res = await axios.post("/student/jobs/status/" + jobId + "/interviews", { status });
    this.addJobsFromDB();
  };
   deleteProcesses = async function (id) {
    const res = await axios.delete(
      `/student/jobs/${id}`,

    );
    this.addJobsFromDB();
  }
}
