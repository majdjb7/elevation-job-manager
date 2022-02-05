import { observable, action, makeObservable, computed } from "mobx";
import axios from "axios";
import { toJS } from "mobx";
import { requests, getTotalWorkersFromDB } from "../requests";

export class AdminInventory {
  constructor() {
    this.allStudentsProcesses = [];
    this.allStudents = [];
    this.studentsNames = [];
    this.showCurrCohort = "All";

    makeObservable(this, {
      allStudentsProcesses: observable,
      studentsNames: observable,
      allStudents: observable,

      totalStudents: computed,
      getAllStudentsProcessesFromDB: action,
      filterProcessesByCohortName: action,
      filterProcessesByStatus: action,
      getAllStudentsNames: action,
      filterProcessesByName: action,
    });
    this.getAllStudentsProcessesFromDB();
  }
  get totalStudents() {
    return this.allStudents.length;
  }

  // getTotalWorkers = async () => {
  //   let result = getTotalWorkersFromDB("Cohort 21");
  //   console.log(result);
  // };
  generateAllStudentsProcesses = () => {
    this.allStudents.map((s) => {
      s.jobs.map((j) => {
        let newJob = j;
        newJob["studentName"] = s.firstName + " " + s.lastName;
        newJob["mobileNo"] = s.mobileNo;
        newJob["email"] = s.email;
        newJob["cohort"] = s.cohort;
        this.allStudentsProcesses.push(newJob);
      });
    });
  };

  filterProcessesByCohortName = async (cohortName) => {
    this.allStudents = [];
    this.allStudentsProcesses = [];
    this.showCurrCohort = cohortName;
    if (cohortName === "All") {
      await this.getAllStudentsProcessesFromDB();
    } else {
      let result = await axios.get(
        `http://localhost:8888/admin/cohorts/${cohortName}`
      );
      this.allStudents = result.data;
      this.generateAllStudentsProcesses();
    }
  };
  filterProcessesByName = async (name) => {
    this.allStudents = [];
    this.allStudentsProcesses = [];

    let result = await axios.get(
      `http://localhost:8888/admin/students/${name}`
    );
    this.allStudents = result.data;
    this.generateAllStudentsProcesses();
  };
  getAllStudentsNames = async () => {
    await this.getAllStudentsProcessesFromDB();
    this.allStudentsProcesses.forEach((s) => {
      this.studentsNames.push(s.studentName);
    });
    this.studentsNames = [...new Set(this.studentsNames)];
  };
  filterProcessesByStatus = async (status) => {
    await this.filterProcessesByCohortName(this.showCurrCohort);
    let filterArr = this.allStudentsProcesses.filter((a) => a.status == status);
    this.allStudentsProcesses = [...filterArr];
  };
  getAllStudentsProcessesFromDB = async () => {
    this.allStudents = [];
    this.allStudentsProcesses = [];
    try {
      let result = await axios.get(`http://localhost:8888/admin/jobs`);
      this.allStudents = result.data;
    } catch (error) {
      console.log("Something wrong");
    }
    try {
      let jobs = await axios.get(`http://localhost:8888/admin/allJobs`);
      this.allStudentsProcesses = jobs.data;
    } catch (error) {
      console.log("Something wrong");
    }
  };
}
