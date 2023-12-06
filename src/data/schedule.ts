import { ScheduleType } from "./types";

const schedule: ScheduleType = {
  Pietrzykowice: {
    listopad: {
      Plastik: ["5", "19", "26", "28"],
      Makulatura: ["12"],
      Szklo: ["29"],
    },
    grudzien: {
      Plastik: ["5", "19"],
      Makulatura: ["12"],
      Szklo: ["30"],
    },
  },
  Pcim: {
    listopad: {
      Plastik: ["5", "19", "26", "28"],
      Makulatura: ["12"],
      Szklo: ["29"],
    },
    grudzien: {
      Plastik: ["6", "11", "17"],
      Makulatura: ["19"],
      Szklo: ["31"],
    },
  },
};

export default schedule;
