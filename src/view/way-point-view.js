import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDueDate, getTimeDuration} from '../utils/event.js';
import { DateFormat } from '../const.js';


const createTimeStartTemplate = (point) => {
  const {dateFrom} = point;
  return `<time class="event__date" datetime=${dateFrom}>${humanizeEventDueDate(dateFrom, DateFormat.EVENT_DATE)}</time>`;
};

const createTypeTemplate = (point) => {
  const {type} = point;
  return `<div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>`;
};

const createDestinationNameTemplate = (point, destinations) => {
  const {type} = point;
  const eventDestination = destinations.find((destination) => destination.id === point.destination);
  return `<h3 class="event__title">${type} ${eventDestination.name}</h3>`;
};

const createTimeSheduleTemplate = (point) => {
  const {dateFrom, dateTo} = point;
  return `<div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${dateFrom}>${humanizeEventDueDate(dateFrom, DateFormat.EVENT_TIME)}</time>
                    &mdash;
                    <time class="event__end-time" datetime=${dateTo}>${humanizeEventDueDate(dateTo, DateFormat.EVENT_TIME)}</time>
                  </p>
                  <p class="event__duration">${getTimeDuration(dateFrom, dateTo)}</p>
                </div>`;
};

const createPriceTemplate = (point) => {
  const {basePrice} = point;
  return `<p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>`;
};

const createOffersTemplate = (point, offers) => {
  const typeOffers = offers.find((offer) => offer.type === point.type).offers;
  const eventOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  return `<h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${eventOffers.map((offer) => (
    `<li class="event__offer">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>`
  )).join('')}

                </ul>`;
};

const createBtnsTemplate = (point) => {
  const {isFavorite} = point;
  return `<button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''} type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>`;
};

const createWayPointTemplate = (point, destinations, offers) => (
  `<li class="trip-events__item">
              <div class="event">
               ${createTimeStartTemplate(point)}
               ${createTypeTemplate(point)}
               ${createDestinationNameTemplate(point, destinations)}
               ${createTimeSheduleTemplate(point)}
               ${createPriceTemplate(point)}
               ${createOffersTemplate(point, offers)}
               ${createBtnsTemplate(point)}
              </div>
            </li>`
);
export default class WayPointView extends AbstractView {
  #point = [];
  #destinations = [];
  #offers = [];
  #handleRollupBtnClick = null;
  #handleFavoriteClick = null;

  constructor({point, destinations, offers, onRollupBtnClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleRollupBtnClick = onRollupBtnClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupBtnClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createWayPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #rollupBtnClickHandler = () => {
    this.#handleRollupBtnClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
