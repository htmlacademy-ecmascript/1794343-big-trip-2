export const EVENTS_COUNT = 3;

export const DateFormats = {
  EVENT_DATE: 'MMM D',
  EVENT_TIME: 'HH:mm',
  NEW_EVENT: 'DD/MM/YY HH:mm'
};

export const TimeConsts = {
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
