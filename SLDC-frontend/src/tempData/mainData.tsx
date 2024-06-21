import { GraphInputData } from '../types/GraphInputData';

const mainData: GraphInputData[] = [
  {
    zone_name: 'Zone 1',
    type: 'area',
    data: [10, 12, 14, 11, 13, 15, 20, 18, 22, 25],
  },
  {
    zone_name: 'Zone 2',
    type: 'area',
    data: [8, 9, 10, 7, 6, 8, 12, 14, 16, 18],
  },
  {
    zone_name: 'Zone 3',
    type: 'area',
    data: [5, 6, 7, 5, 8, 9, 10, 11, 13, 15],
  },
];

const labels = [
  '2023-05-01T00:00:00Z',
  '2023-05-01T01:00:00Z',
  '2023-05-01T02:00:00Z',
  '2023-05-01T03:00:00Z',
  '2023-05-01T04:00:00Z',
  '2023-05-01T05:00:00Z',
  '2023-05-01T06:00:00Z',
  '2023-05-01T07:00:00Z',
  '2023-05-01T08:00:00Z',
  '2023-05-01T09:00:00Z',
];

export { mainData, labels };
