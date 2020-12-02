export const testGetReadings = (table: string): any => {
  const map: {[key: string]: any} = {
    bg: BgReadings,
    dose: DoseReadings,
    macro: MacroReadings
  };
  console.log('Fake readings for: ', table);

  return map[table];
};

export const testGetStats = (): any => {
  console.log('Fake readings for stats');
  return StatsReadings;
};

export const BgReadings = [
  {
    id: 66,
    created: '2020-08-09T09:31:35.490Z',
    reading: 5.9
  },
  {
    id: 65,
    created: '2020-08-09T09:08:53.759Z',
    reading: 5.5
  },
  {
    id: 64,
    created: '2020-08-07T18:29:53.698Z',
    reading: 8.8
  },
  {
    id: 63,
    created: '2020-08-06T18:52:11.936Z',
    reading: 4.4
  },
  {
    id: 62,
    created: '2020-08-06T18:27:43.721Z',
    reading: 9.4
  },
  {
    id: 61,
    created: '2020-08-05T20:55:16.145Z',
    reading: 14.5
  },
  {
    id: 60,
    created: '2020-08-05T19:44:08.470Z',
    reading: 5.7
  },
  {
    id: 59,
    created: '2020-08-03T07:20:06.947Z',
    reading: 4.2
  }
];

export const StatsReadings = [
  {
    cretaed: '3 Day',
    avg: 6.8,
    stddev: 2.18059614267934
  },
  {
    cretaed: '7 Day',
    avg: 5.8,
    stddev: 1.18059614267934
  },
  {
    cretaed: '14 Day',
    avg: 5.7,
    stddev: 3.18059614267934
  },
  {
    cretaed: '30 Day',
    avg: 5.2,
    stddev: 1.28059614267934
  },
  {
    cretaed: '90 Day',
    avg: 5.8,
    stddev: 1.71059614267934
  }
];

export const DoseReadings = [
  {
    id: 20,
    created: '2020-08-07T18:30:17.885Z',
    reading: 3.5,
    islong: false
  },
  {
    id: 19,
    created: '2020-08-05T21:02:06.448Z',
    reading: 14,
    islong: false
  },
  {
    id: 18,
    created: '2020-08-05T21:01:54.143Z',
    reading: 14,
    islong: true
  },
  {
    id: 17,
    created: '2020-08-05T21:01:41.140Z',
    reading: 3,
    islong: false
  },
  {
    id: 16,
    created: '2020-07-12T07:17:51.838Z',
    reading: 5.5,
    islong: false
  },
  {
    id: 15,
    created: '2020-07-12T07:17:50.220Z',
    reading: 4,
    islong: false
  },
  {
    id: 14,
    created: '2020-07-12T07:17:47.118Z',
    reading: 1,
    islong: false
  },
  {
    id: 13,
    created: '2020-07-12T07:17:42.732Z',
    reading: 1.5,
    islong: false
  },
  {
    id: 12,
    created: '2020-07-12T07:17:40.564Z',
    reading: 5.5,
    islong: false
  },
  {
    id: 11,
    created: '2020-07-12T07:17:31.169Z',
    reading: 8.5,
    islong: true
  },
  {
    id: 10,
    created: '2020-07-12T07:17:26.492Z',
    reading: 3.5,
    islong: true
  },

];

export const MacroReadings = [
  {
    id: 6,
    created: '2020-06-20T15:37:04.964Z',
    kcal: 1122,
    carbs: 7.2,
    sugar: 3.8,
    protein: 32.5,
    fat: 60.2
  },
  {
    id: 5,
    created: '2020-06-20T15:36:46.585Z',
    kcal: 142,
    carbs: 4.2,
    sugar: 1.8,
    protein: 2.5,
    fat: 30.2
  },
  {
    id: 4,
    created: '2020-06-20T15:36:30.358Z',
    kcal: 123,
    carbs: 1.2,
    sugar: 0.8,
    protein: 20.5,
    fat: 10.2
  }
];
