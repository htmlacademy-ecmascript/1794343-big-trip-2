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

export {humanizeEventDueDate, getTimeDuration, isEventToday, isEventHappened, isEventBeInFuture};
