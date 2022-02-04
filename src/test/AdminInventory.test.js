import React from "react";
import { AdminInventory } from "../stores/AdminInventory";

test("Testing number Of Students in the beginning", () => {
  const adminInventory = new AdminInventory();
  expect(adminInventory.numOfStudents).toBe(0);
});
