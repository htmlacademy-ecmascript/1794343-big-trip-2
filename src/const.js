export const EVENTS_COUNT = 5;

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

export const MessageWithoutEvent = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now'
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
