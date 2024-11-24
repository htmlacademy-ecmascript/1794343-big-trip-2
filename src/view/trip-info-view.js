import AbstractView from '../framework/view/abstract-view.js';
import { getMinDate, getMaxDate, getDestinationName, getTotalPrice } from '../utils/trip-info.js';
import { DateFormat } from '../const';
import dayjs from 'dayjs';

function createTripInfoTemplate(points, destinations, offers) {

  const startDate = getMinDate(points);
  const endDate = getMaxDate(points);
  const isMonthTheSame = dayjs(startDate).format('MMM') === dayjs(endDate).format('MMM');

  const firstPoint = points.find((point) => point.dateFrom.toISOString() === startDate.toISOString());
  const lastPoint = points.find((point) => point.dateTo.toISOString() === endDate.toISOString());

  const firstName = getDestinationName(firstPoint, destinations);
  const lastName = getDestinationName(lastPoint, destinations);

  function getDestinationTemplate() {
    if (points.length === 1) {
      return `<h1 class="trip-info__title">${firstName}</h1>`;
    }
    if (points.length === 2) {
      return `<h1 class="trip-info__title">${firstName} &mdash; ${lastName}</h1>`;
    }
    if (points.length === 3) {
      const secondPoint = points.filter((point) => (
        (point !== firstPoint) && (point !== lastPoint)))[0];
      const secondName = getDestinationName(secondPoint, destinations);
      return `<h1 class="trip-info__title">${firstName} &mdash; ${secondName} &mdash; ${lastName}</h1>`;
    }
    return `<h1 class="trip-info__title">${firstName} &mdash; ... &mdash; ${lastName}</h1>`;
  }

  function getDataTemplate() {
    return points.length === 1 ?
      `<p class="trip-info__dates">${dayjs(startDate).format(DateFormat.HEADER_DAY_MONTH)}</p>` :
      `<p class="trip-info__dates">
              ${isMonthTheSame ? dayjs(startDate).format(DateFormat.HEADER_ONLY_DAY) : dayjs(startDate).format(DateFormat.HEADER_DAY_MONTH)}
              &nbsp; &mdash; &nbsp; ${dayjs(endDate).format(DateFormat.HEADER_DAY_MONTH)}</p>`;
  }


  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
${getDestinationTemplate()}
${getDataTemplate()}

            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points, offers)}</span>
            </p>
          </section>`;
}
export default class TripInfoView extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
