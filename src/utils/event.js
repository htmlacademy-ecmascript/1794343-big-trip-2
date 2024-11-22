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
  if (minutesDuration >= TimeConst.MINUTES_PER_100_DAYS) {
    const daysDuration = dayjs(end).diff(start, 'day');
    const hoursAndMinutesDuration = dayjs.duration(minutesDuration, 'minutes').format('HH[H] mm[M]');
    return `${daysDuration}D ${hoursAndMinutesDuration}`;
  }
  return dayjs.duration(minutesDuration, 'minutes').format('DD[D] HH[H] mm[M]');
}

function isEventToday(dateFrom, dateTo) {
  return (dayjs(dateFrom).isSame(dayjs(), 'D') || dayjs().isAfter(dateFrom, 'D')) &&
         (dayjs(dateTo).isSame(dayjs(), 'D') || dayjs().isBefore(dateTo, 'D'));
}


function isEventHappened(dateTo) {
  return dateTo && dayjs().isAfter(dateTo, 'D');
}

function isEventBeInFuture(dateFrom) {
  return dateFrom && dayjs().isBefore(dateFrom, 'D');
}

function sortDate(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

function sortTime(eventA, eventB) {
  const durationA = dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo));
  const durationB = dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo));
  return (durationA - durationB);
}

export {humanizeEventDueDate, getTimeDuration, isEventToday, isEventHappened, isEventBeInFuture, sortDate, sortPrice, sortTime};
