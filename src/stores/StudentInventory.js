import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.StudentJobs = [];
    this.studentData = {};
    this.studentProfileJobs = [];
    this.firstName = "";
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.studentId = "";
    makeObservable(this, {
      firstName: observable,
      StudentJobs: observable,
      studentData: observable,
      studentProfileJobs: observable,
      numItems: computed,
      addJobsFromDB: action,
      getStudentData: action,
      deleteProcesses: action,
      EditDone: action,
    });
  }
  get numItems() {
    return this.StudentJobs.length;
  }
  addJobsFromDB = async (studentID) => {
    try {
      if (this.isAdmin == false) {
        let result = await axios.get(
          `http://localhost:8888/student/jobs/${studentID}`
        );
        this.StudentJobs = result.data;
      }
    } catch (error) {
      console.log("Something wrong");
    }
  };

  getStudentData = async (id) => {
    this.studentId = id;
    const studentData = await axios.get(
      `http://localhost:8888/student/data/${id}`
    );
    this.studentData = studentData.data;
    let result = await axios.get(`http://localhost:8888/student/jobs/${id}`);
    this.StudentJobs = result.data;
  };

  EditDone = async (
    studentId,
    id,
    companyName,
    location,
    whereFindJob,
    role,
    description,
    interviewId,
    type,
    time,
    status
  ) => {
    const res = await axios.post(
      `http://localhost:8888/student/edit/jobs/${id}`,
      {
        companyName,
        location,
        whereFindJob,
        role,
        description,
        interviewId,
        type,
        time,
      }
    );
    if (status != "") {
      this.edditStatusForStudent(id, status);
    }
    this.addJobsFromDB(studentId);
  };
  edditStatusForStudent = async (jobId, status) => {
    const res = await axios.post(
      "http://localhost:8888/student/jobs/status/" + jobId + "/interviews",
      { status }
    );
  };
  deleteProcesses = async function (studentId, id) {
    const res = await axios.delete(`http://localhost:8888/student/jobs/${id}`);
    this.addJobsFromDB(studentId);
  };
}
