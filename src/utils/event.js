import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TimeConst } from '../const';

dayjs.extend(duration);

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function getTimeDuration(start, end) {
  const minutesDuration = dayjs(end).diff(start, 'minute');

  if (minutesDuration < TimeConst.MINUTES_PER_HOUR) {
    return dayjs.duration(minutesDuration, 'minutes').format('mm[M]');
  }
  if (minutesDuration < TimeConst.MINUTES_PER_DAY) {
    return dayjs.duration(minutesDuration, 'minutes').format('HH[H] mm[M]');
  }
  return dayjs.duration(minutesDuration, 'minutes').format('DD[D] HH[H] mm[M]');
}

function isEventToday(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function isEventHappened(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isEventBeInFuture(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

function getWeightForNull(eventA, eventB) {
  if (eventA === null && eventB === null) {
    return 0;
  }
  if (eventA === null) {
    return 1;
  }
  if (eventB === null) {
    return -1;
  }
  return null;
}
function sortDate(eventA, eventB) {
  const weight = getWeightForNull(eventA.dateFrom, eventB.dateFrom);
  return weight ?? dayjs(eventB.dateFrom).diff(dayjs(eventA.dateFrom));
}

function sortPrice(eventA, eventB) {
  const weight = getWeightForNull(eventA.basePrice, eventB.basePrice);
  return weight ?? (eventB.basePrice - eventA.basePrice);
}

function sortTime(eventA, eventB) {
  const weight = getWeightForNull(eventA, eventB);
  const durationA = dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo));
  const durationB = dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo));
  return weight ?? (durationA - durationB);
}

export {humanizeEventDueDate, getTimeDuration, isEventToday, isEventHappened, isEventBeInFuture, sortDate, sortPrice, sortTime};
