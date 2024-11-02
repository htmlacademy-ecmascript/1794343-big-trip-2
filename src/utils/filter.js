import { FilterType } from '../const';
import { isEventToday, isEventHappened, isEventBeInFuture } from './event';
const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isEventHappened(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventToday(point.dateFrom)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventBeInFuture(point.dateFrom)),
};
export {filter};
