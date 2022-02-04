import React from "react";
import { sortPerCohortName } from "../requests";

test("properly get student by cohort name", () => {
  const res = sortPerCohortName("Cohort 22").then(function (result) {
    expect(result.length).toBe(3);
  });
});
