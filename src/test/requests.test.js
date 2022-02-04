import React from "react";
import { testing, getTotalWorkersFromDB } from "../requests";

test("Testing ", () => {
  return testing().then(function (result) {
    expect(result).toBe("Hello");
  });
});
