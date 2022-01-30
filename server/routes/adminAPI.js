const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");

router.get("/jobs", async (req, res) => {
  try {
    await Student.find({})
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
      })
      .exec(function (err, studentJobs) {
        res.send(studentJobs);
      });
  } catch (error) {
    res.send(error);
  }
});

router.get("/cohorts/:cohortName", async (req, res) => {
  try {
    await Student.find({ cohort: req.params.cohortName })
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
      })
      .exec(function (err, studentJobs) {
        res.send(studentJobs);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
