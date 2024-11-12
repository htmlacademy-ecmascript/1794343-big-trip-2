import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES, DateFormat } from '../const.js';
import { humanizeEventDueDate } from '../utils/event.js';
import { makeFirstCharBig } from '../utils/common.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createTypeTemplate = (point) => {
  const {type, checkedPointType} = point;
  const pointId = point.id || 0;
  return `<div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedPointType || type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${POINT_TYPES.map((pointType) => (
    `<div class="event__type-item">
                          <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio"
                            name="event-type" value="${pointType}"
                            ${pointType === checkedPointType ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">
                          ${makeFirstCharBig(pointType)}</label>
                        </div>`
  )).join('')}
                      </fieldset>
                    </div>
                  </div>`;
};

const createDestinationNameTemplate = (point, destinations) => {
  const {type, checkedPointType, destination, checkedDestination} = point;
  const pointId = point.id || 0;
  const eventDestination = destinations.find((pointDestination) => (destination === pointDestination.id));
  return `<div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${pointId}">
                      ${checkedPointType || type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text"
                      name="event-destination" value="${checkedDestination || eventDestination?.name || ''}" list="destination-list-${pointId}">
                    <datalist id="destination-list-${pointId}">
                      ${destinations.map((pointDestination) => `<option value="${pointDestination.name}"></option>`).join('')}
                    </datalist>
                  </div>`;
};

const createTimeTemplate = (point) => {
  const {dateFrom, dateTo} = point;
  const pointId = point.id || 0;
  return `<div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${humanizeEventDueDate(dateFrom, DateFormat.NEW_EVENT)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${humanizeEventDueDate(dateTo, DateFormat.NEW_EVENT)}">
                  </div>`;
};

const createPriceTemplate = (point) => {
  const {basePrice} = point;
  const pointId = point.id || 0;
  return `<div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${pointId}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${pointId}" type="text"
                    name="event-price" value="${basePrice}">
                  </div>`;
};

const createBtnsTemplate = (point) => {
  const pointId = point.id || 0;
  return `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${pointId ? 'Delete' : 'Cancel'}</button>
                  ${pointId ? `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>` : ''}`;
};

const createOffersTemplate = (point, offers) => {
  const {checkedPointType} = point;
  const pointId = point.id || 0;
  const typeOffers = offers?.find((offer) => offer.type === (checkedPointType || point.type)).offers;
  const eventOffers = typeOffers?.filter((typeOffer) => point.offers.includes(typeOffer.id));

  return `${typeOffers?.length ?
    `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">

                    ${typeOffers?.map((typeOffer) => {
    const isChecked = eventOffers.map((eventOffer) => eventOffer.id).includes(typeOffer.id);
    return `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer.title}-${pointId}" type="checkbox"
                        name="event-offer-${typeOffer.title}"
                        data-offer-id="${typeOffer.id}"
                        ${isChecked ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
                          <span class="event__offer-title">${typeOffer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${typeOffer.price}</span>
                        </label>
                      </div>`;
  }).join('')}
                    </div>
                  </section>`
    : ''}`;
};

const createDestinationsTemplate = (point, destinations) => {
  const {checkedDestinationId} = point;
  const eventDestination = destinations?.find((destination) => (destination.id === (checkedDestinationId || point.destination)));
  const {description, pictures} = eventDestination || {};
  return `${eventDestination ?
    `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  ${pictures.length ?
    `<div class="event__photos-container">
                      <div class="event__photos-tape">
    ${pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}"></img>`)}
                      </div>
                    </div>` : ''}
                  </section>` : ''}
                </section>
              </form>`;
};


const createFormEditTemplate = (point, destinations, offers) => (
  `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  ${createTypeTemplate(point)}
                  ${createDestinationNameTemplate(point, destinations)}
                  ${createTimeTemplate(point)}
                  ${createPriceTemplate(point)}
                  ${createBtnsTemplate(point)}
                </header>
                <section class="event__details">
                  ${createOffersTemplate(point, offers)}
                  ${createDestinationsTemplate(point, destinations)}
                </section>
              </form>`);

export default class FormEditView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #handleFormSubmit = null;
  #handleRolldownBtnClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point, destinations, offers, onFormSubmit, onRolldownBtnClick}) {
    super();
    this._setState(FormEditView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleRolldownBtnClick = onRolldownBtnClick;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      ?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#rolldownBtnClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination')
      ?.addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price')
      ?.addEventListener('input', this.#priceChangeHandler);

    this.#setDatepicker();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      FormEditView.parsePointToState(point),
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #rolldownBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRolldownBtnClick(FormEditView.parsePointToState(this.point));
  };

  #pointTypeChangeHandler = (evt) => {
    this.updateElement({
      checkedPointType: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const checkedPointDestination = this.#destinations?.find((destination) => destination.name === evt.target.value);
    this.updateElement({
      checkedDestination: evt.target.value,
      checkedDestinationId: checkedPointDestination ? checkedPointDestination.id : null
    });
  };

  #offersChangeHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: checkedOffers.map((checkedOffer) => checkedOffer.dataset.offerId)
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: parseInt(evt.target.value, 10),
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepicker() {
    const [dateFrom, dateTo] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      dateFrom,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      },
    );
    this.#datepickerTo = flatpickr(
      dateTo,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      },
    );
  }


  static parsePointToState(point) {
    return point;
  }

  static parseStateToPoint(state) {
    const point = {...state};

    point.type = point.checkedPointType;
    point.destination = point.checkedDestinationId;

    delete point.selectedPointType;
    delete point.checkedDestination;
    delete point.checkedDestinationId;

    return point;
  }
}
