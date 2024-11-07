import {nanoid} from 'nanoid';
import { getRandomArrayElement } from '../utils/common.js';

const points = [
  {
    //id: nanoid(),
    basePrice: 800,
    dateFrom: '2024-01-10T22:55:56.845Z',
    dateTo: '2024-01-10T23:22:13.375Z',
    destination: 'afe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: [
      'a4c3e4e6-9053-42ce-b747-e281314baa31',
      'c4c3e4e6-9053-42ce-b747-e281314baa31',
      'd4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'taxi'
  },
  {
    //id: nanoid(),
    basePrice: 500,
    dateFrom: '2024-03-12T02:55:56.845Z',
    dateTo: '2024-03-15T11:14:00.375Z',
    destination: 'bfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [
      'c4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: 'bus'
  },
  {
    //id: nanoid(),
    basePrice: 5100,
    dateFrom: '2024-05-10T20:40:56.845Z',
    dateTo: '2024-05-10T22:42:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: [
      'd4c3e4e6-9053-42ce-b747-e281314baa32',
      'e4c3e4e6-9053-42ce-b747-e282314baa32'
    ],
    type: 'flight'
  },
  {
    //id: nanoid(),
    basePrice: 600,
    dateFrom: '2024-07-01T23:05:56.845Z',
    dateTo: '2024-07-08T11:22:13.375Z',
    destination: 'dfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [],
    type: 'drive'
  },
  {
    //id: nanoid(),
    basePrice: 780,
    dateFrom: '2024-08-01T22:55:56.845Z',
    dateTo: '2024-08-08T19:45:13.375Z',
    destination: 'dfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [
      'e4c3e4e6-9053-42ce-b747-e281314baa32',
      'e4c3e4e6-9053-42ch-b747-e281314baa32'
    ],
    type: 'train'
  },
  {
    //id: nanoid(),
    basePrice: 455,
    dateFrom: '2024-10-01T22:55:56.845Z',
    dateTo: '2024-10-08T11:22:13.375Z',
    destination: 'dfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: [
      'e4c3e4e6-9053-42ce-b747-e181314baa32'
    ],
    type: 'check-in'
  },
  {
    //id: nanoid(),
    basePrice: 906,
    dateFrom: '2024-12-01T06:55:56.845Z',
    dateTo: '2024-12-08T11:29:13.375Z',
    destination: 'dfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },
  {
    //id: nanoid(),
    basePrice: 1600,
    dateFrom: new Date().toISOString(),
    dateTo: new Date().toISOString(),
    destination: 'dfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: [
      'e4c3e4e6-9053-42ce-b747-e281414baa32'
    ],
    type: 'restaurant'
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points)
  };
}

export {getRandomPoint};
