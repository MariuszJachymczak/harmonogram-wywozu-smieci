export type ScheduleType = {
  [city: string]: {
    [month: string]: {
      [wasteType: string]: string[];
    };
  };
};
