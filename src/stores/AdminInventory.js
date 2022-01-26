import { observable, action, makeObservable, computed } from "mobx";
import axios from "axios";
import { toJS } from 'mobx'

export class AdminInventory {
  constructor() {
    this.AdminJobs = [];
    this.allStudents = []
    makeObservable(this, {
      AdminJobs: observable,
      allStudents: observable,
      numItems: computed,
      addJobsFromDBToAdmin: action,
    });
    this.addJobsFromDBToAdmin();
  }
  get numItems() {
    return this.AdminJobs.length;
  }

  sortAllStudentJobs = () => {
    this.allStudents.map(s => {
      s.jobs.map(j => {
        let newJob = j
        newJob['studentName'] = s.firstName + ' ' + s.lastName
        newJob['mobileNo'] = s.mobileNo
        newJob['email'] = s.email
        newJob['cohort'] = s.cohort
        this.AdminJobs.push(newJob)
      })
    })
  }

  addJobsFromDBToAdmin = async () => {
    // this.allStudents = []
    let result = await axios.get(`http://localhost:8888/admin/jobs`);
    this.allStudents = result.data;
    this.sortAllStudentJobs()

  };
}
