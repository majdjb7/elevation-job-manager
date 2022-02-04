import React from "react";
import { AdminInventory } from "../stores/AdminInventory";

test("Testing AdminInventory", () => {
  const adminInventory = new AdminInventory();
  expect(adminInventory.numOfStudents).toBe(0);
});
