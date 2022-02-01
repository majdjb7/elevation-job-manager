import { observable, action, makeObservable, computed } from "mobx";
import axios from "axios";
import { toJS } from "mobx";

export class AdminInventory {
  constructor() {
    this.AdminJobs = [];
    this.allStudents = [];
    this.studentData=[];
    this.studentProfileJobs=[];
    this.showCurrCohort = "Cohort 21";
    this.acceptedStudentsPercentage = { Employed: 0, Unemployed: 0 };
    this.acceptedStudentsPercentagePerCohort = { Employed: 0, Unemployed: 0 };
    this.statsOfJobStatus = {
      Open: 0,
      Accepted: 0,
      Rejected: 0,
      Pending: 0,
      NoReply: 0,
    };
    this.statsOfJobStatusByCohort = {
      Open: 0,
      Accepted: 0,
      Rejected: 0,
      Pending: 0,
      NoReply: 0,
    };

    makeObservable(this, {
      AdminJobs: observable,
      allStudents: observable,
      acceptedStudentsPercentage: observable,
      acceptedStudentsPercentagePerCohort: observable,
      statsOfJobStatus: observable,
      statsOfJobStatusByCohort: observable,
      numItems: computed,
      addJobsFromDBToAdmin: action,
      sortPerCohortName: action,
      sortByStatus: action,
    });
    this.addJobsFromDBToAdmin();
  }
  get numItems() {
    return this.AdminJobs.length;
  }

  get numOfStudents() {
    return this.allStudents.length;
  }

  sortAllStudentJobs = () => {
    this.allStudents.map((s) => {
      s.jobs.map((j) => {
        let newJob = j;
        newJob["studentName"] = s.firstName + " " + s.lastName;
        newJob["mobileNo"] = s.mobileNo;
        newJob["email"] = s.email;
        newJob["cohort"] = s.cohort;
        this.AdminJobs.push(newJob);
      });
    });
  };

  //GENERAL: Returns how many students have accepted jobs, and and the rest whoa re still searching
  getStatsOfAcceptedStudents = () => {
    this.acceptedStudentsPercentage["Unemployed"] = 0;
    this.acceptedStudentsPercentage["Employed"] = 0;
    this.allStudents.map((s) => {
      let accepted = false;
      s.jobs.map((j) => {
        if (j.status == "Accepted") {
          accepted = true;
        }
      });
      accepted == false
        ? (this.acceptedStudentsPercentage["Unemployed"] += 1)
        : (this.acceptedStudentsPercentage["Employed"] += 1);
    });
    return this.acceptedStudentsPercentage;
  };

  //BY COHORT: Returns how many students have accepted jobs, and and the rest whoa re still searching

  getStatsOfAcceptedStudentsPerCohort = (cohort) => {
    this.acceptedStudentsPercentagePerCohort["StudentsSearching"] = 0;
    this.acceptedStudentsPercentagePerCohort["Employed"] = 0;
    this.allStudents.map((s) => {
      if (s.cohort == cohort) {
        let accepted = false;
        s.jobs.map((j) => {
          if (j.status == "Accepted") {
            accepted = true;
          }
        });
        accepted == false
          ? (this.acceptedStudentsPercentagePerCohort["StudentsSearching"] += 1)
          : (this.acceptedStudentsPercentagePerCohort["Employed"] += 1);
      }
    });
    return this.acceptedStudentsPercentagePerCohort;
  };

  getStatusStats = () => {
    this.statsOfJobStatus["Open"] = 0;
    this.statsOfJobStatus["Accepted"] = 0;
    this.statsOfJobStatus["Rejected"] = 0;
    this.statsOfJobStatus["Pending"] = 0;
    this.statsOfJobStatus["NoReply"] = 0;

    this.allStudents.map((s) => {
      s.jobs.map((j) => {
        if (j.status == "Open") {
          this.statsOfJobStatus["Open"] += 1;
        }
        if (j.status == "Accepted") {
          this.statsOfJobStatus["Accepted"] += 1;
        }
        if (j.status == "Rejected") {
          this.statsOfJobStatus["Open"] += 1;
        }
        if (j.status == "Pending") {
          this.statsOfJobStatus["Pending"] += 1;
        }
        if (j.status == "NoReply") {
          this.statsOfJobStatus["NoReply"] += 1;
        }
      });
    });
    return this.statsOfJobStatus;
  };

  getStatusStatsByCohort = (cohort) => {
    this.statsOfJobStatusByCohort["Open"] = 0;
    this.statsOfJobStatusByCohort["Accepted"] = 0;
    this.statsOfJobStatusByCohort["Rejected"] = 0;
    this.statsOfJobStatusByCohort["Pending"] = 0;
    this.statsOfJobStatusByCohort["NoReply"] = 0;

    this.allStudents.map((s) => {
      if (s.cohort == cohort) {
        s.jobs.map((j) => {
          if (j.status == "Open") {
            this.statsOfJobStatusByCohort["Open"] += 1;
          }
          if (j.status == "Accepted") {
            this.statsOfJobStatusByCohort["Accepted"] += 1;
          }
          if (j.status == "Rejected") {
            this.statsOfJobStatusByCohort["Open"] += 1;
          }
          if (j.status == "Pending") {
            this.statsOfJobStatusByCohort["Pending"] += 1;
          }
          if (j.status == "NoReply") {
            this.statsOfJobStatusByCohort["NoReply"] += 1;
          }
        });
      }
    });
    return this.statsOfJobStatusByCohort;
  };
  sortPerCohortName = async (cohortName) => {
    this.allStudents = [];
    this.AdminJobs = [];
    this.showCurrCohort = cohortName;
    try{
    let result = await axios.get(
      `http://localhost:8888/admin/cohorts/${cohortName}`
    );
  
    this.allStudents = result.data;
    this.sortAllStudentJobs();
  }catch(error){
    console.log("Something wrong")
  }
  };
  sortByStatus = async (status) => {
    await this.sortPerCohortName(this.showCurrCohort);
    let filterArr = this.AdminJobs.filter((a) => a.status == status);
    this.AdminJobs = [...filterArr];
  };
  addJobsFromDBToAdmin = async () => {
    this.allStudents = [];
    this.AdminJobs = [];
    try{
    let result = await axios.get(`http://localhost:8888/admin/jobs`);
    this.allStudents = result.data;
    }catch(error){
      console.log("Something wrong") 
    }
    try{
    let jobs = await axios.get(`http://localhost:8888/admin/allJobs`);
    this.AdminJobs = jobs.data;
    }catch(error){
      console.log("Something wrong") 
    }
    //  this.sortAllStudentJobs();
  };
}
