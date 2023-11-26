export type ScheduleType = {
  [city: string]: {
    [month: string]: {
      [wasteType: string]: string[];
    };
  };
};

export type MonthNamesType = {
  [key: string]: number;
};
