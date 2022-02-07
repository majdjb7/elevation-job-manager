export const NumOfWorkers = (WorkersProcesses) => {
  let totalWorkers = {};
  WorkersProcesses.map((s) => {
    if (!totalWorkers[s.studentId] && s.status === "Accepted") {
      totalWorkers[s.studentId] = 1;
    }
  });

  return Object.keys(totalWorkers).length;
};
