import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TimeConst } from './const';

dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate, dateFormat) {
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

function makeFirstCharBig(word) {
  const bigFirstChar = word.charAt(0).toUpperCase();
  return bigFirstChar + word.slice(1);
}

export {getRandomArrayElement, humanizeTaskDueDate, getTimeDuration, makeFirstCharBig};
