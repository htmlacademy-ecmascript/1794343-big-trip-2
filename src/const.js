export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const DateFormat = {
  EVENT_DATE: 'MMM D',
  EVENT_TIME: 'HH:mm',
  NEW_EVENT: 'DD/MM/YY HH:mm'
};

export const TimeConst = {
  MINUTES_PER_HOUR: 60,
  MINUTES_PER_DAY: 3600
};

export const POINT_TYPES = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];

export const getDefaultPoint = () => (
  {
    basePrice: 0,
    dateFrom: new Date().toISOString(),
    dateTo: new Date().toISOString(),
    destination: 0,
    isFavorite: false,
    offers: [],
    type: POINT_TYPES[5]
  }
);

export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future'
};

export const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};
