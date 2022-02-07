import { observable, action, makeObservable, computed } from "mobx";
import axios from "axios";
import { toJS } from "mobx";
import { requests, getAllStudentsProcesses } from "../requests";
import { NumOfWorkers } from "./filters";
export class AdminInventory {
  constructor() {
    this.allStudentsProcesses = [];
    this.allStudents = [];
    this.studentsNames = [];
    this.cohorts = [];
    this.showCurrCohort = "All";
    this.totalWorkers = 0;
    makeObservable(this, {
      allStudentsProcesses: observable,
      studentsNames: observable,
      cohorts: observable,
      allStudents: observable,
      totalWorkers: observable,
      totalStudents: computed,
      getAllStudentsProcessesFromDB: action,
      filterProcessesByCohortName: action,
      filterProcessesByStatus: action,
      getAllStudentsNames: action,
      filterProcessesByName: action,
      getTotalWorkers: action,
    });
    this.getAllStudentsProcessesFromDB();
  }
  get totalStudents() {
    return this.allStudents.length;
  }

  getTotalWorkers = async () => {
    let allStudentsProcesses = await getAllStudentsProcesses();

    this.totalWorkers = NumOfWorkers(allStudentsProcesses);
    return this.totalWorkers;
  };
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

  getCohorts = async () => {
    try {
      let result = await axios.get(`http://localhost:8888/admin/cohorts`);
      this.cohorts = result.data;
    }
    catch (error) {
      console.log("Something wrong with getting cohorts")
    }
  }

  addCohort = async (cohort) => {
    try {
      await fetch("http://localhost:8888/admin/cohorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cohort,
        }),
      });
    }
    catch (error) {
      console.log("Something wrong with getting cohorts")
    }
  }

  deleteCohort = async (cohort) => {
    try {
      await fetch("http://localhost:8888/admin/cohorts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cohort,
        }),
      });
    }
    catch (error) {
      console.log("Something wrong with getting cohorts")
    }
  }

}
