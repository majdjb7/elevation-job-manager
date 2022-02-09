const mongoose = require("mongoose");
const Student = require("../server/models/Student");
const Admin = require("../server/models/Admin");
const Job = require("../server/models/Job");
const Interview = require("../server/models/Interview");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/finalProjectDB",
  { useNewUrlParser: true }
);

const studentData = require("./students.json");
const adminData = require("./admins.json");
const jobData = require("./jobs.json");
const interviewData = require("./interviews.json");
function addData() {
  adminData.forEach((admin) => {
    const a = new Admin({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      mobileNo: admin.mobileNo,
      password: admin.password,
    });
    a.save();
  });

  studentData.forEach((student) => {
    const s = new Student({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      cohort: student.cohort,
      mobileNo: student.mobileNo,
      password: student.password,
      jobs: student.jobs,
    });

    jobData.forEach((job) => {
      const j = new Job({
        companyName: job.companyName,
        role: job.role,
        location: job.location,
        description: job.description,
        status: job.status,
        whereFindJob: job.whereFindJob,
        interviews: job.interviews,
      });
      interviewData.forEach((interview) => {
        const i = new Interview({
          type: interview.type,
          time: interview.time,
          interviewerName: interview.interviewerName,
          status: interview.status,
        });
        i.save();
        j.interviews.push(i);
      });
      j.save();
      s.jobs.push(j);
    });

    jobData.forEach((job) => {
      const j = new Job({
        companyName: job.companyName,
        role: job.role,
        location: job.location,
        description: job.description,
        status: job.status,
        whereFindJob: job.whereFindJob,
        mostRecentInterview: "Sunday, August 19, 2018 9:23 PM",
        interviews: job.interviews,
      });
      interviewData.forEach((interview) => {
        const i = new Interview({
          type: interview.type,
          time: interview.time,
          interviewerName: interview.interviewerName,
          status: interview.status,
        });
        i.save();
        j.interviews.push(i);
      });
      j.save();
      s.jobs.push(j);
    });

    jobData.forEach((job) => {
      const j = new Job({
        companyName: job.companyName,
        role: job.role,
        location: job.location,
        description: job.description,
        status: job.status,
        whereFindJob: job.whereFindJob,
        mostRecentDate: null,
        interviews: job.interviews,
      });
      interviewData.forEach((interview) => {
        const i = new Interview({
          type: interview.type,
          time: interview.time,
          interviewerName: interview.interviewerName,
          status: interview.status,
        });
        i.save();
        j.interviews.push(i);
      });
      j.save();
      s.jobs.push(j);
    });

    s.save();
  });
}


function updateJob() {
  try {
    Student.find({})
      .populate({
        path: "jobs",
      })
      .exec(async function (err, students) {

        for (let student of students) {
          for (let job of student.jobs) {
            await Job.findByIdAndUpdate(job._id, { studentId: student._id });
          }
        }
      });
  } catch (error) {
    res.send(error);
  }
}


updateJob();
