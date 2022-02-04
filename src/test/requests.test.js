import React from "react";
import { sum } from "../requests";

test("properly get student by cohort name", async () => {
  let res = sum(1, 2);
  expect(res).toBe(3);
});
