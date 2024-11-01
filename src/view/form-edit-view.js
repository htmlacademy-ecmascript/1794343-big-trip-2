import AbstractView from '../framework/view/abstract-view.js';
import { POINT_TYPES, DateFormat } from '../const.js';
import { makeFirstCharBig, humanizeTaskDueDate } from '../utils.js';

const createFormEditTemplate = (point, destinations, offers) => {
  const {basePrice, dateFrom, dateTo, type} = point;
  const typeOffers = offers.find((offer) => offer.type === point.type).offers;
  const eventOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const eventDestination = destinations.find((destination) => destination.id === point.destination);
  const {name, description, pictures} = eventDestination || {};
  const pointId = point.id || 0;
  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${POINT_TYPES.map((pointType) => (
    `<div class="event__type-item">
                          <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio"
                            name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${makeFirstCharBig(pointType)}</label>
                        </div>`
  )).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${pointId}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text"
                    name="event-destination" value="${name || ''}" list="destination-list-${pointId}">
                    <datalist id="destination-list-${pointId}">
                      ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, DateFormat.NEW_EVENT)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${humanizeTaskDueDate(dateTo, DateFormat.NEW_EVENT)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${pointId}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${pointId}" type="text"
                    name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${pointId ? 'Delete' : 'Cancel'}</button>
                  ${pointId ? `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>` : ''}
                </header>
                <section class="event__details">
                  ${typeOffers.length ?
    `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">

                    ${typeOffers.map((typeOffer) =>
    `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer.title}-${pointId}" type="checkbox"
                        name="event-offer-${typeOffer.title}" ${eventOffers.map((eventOffer) => eventOffer.id).includes(typeOffer.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
                          <span class="event__offer-title">${typeOffer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${typeOffer.price}</span>
                        </label>
                      </div>`
  ).join('')}
                    </div>
                  </section>`
    : ''}
    ${eventDestination ?
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
export default class FormEditView extends AbstractView {
  #point = [];
  #destinations = [];
  #offers = [];
  #handleFormSubmit = null;

  constructor({point, destinations, offers, onFormSubmit}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.element.querySelector('.event--edit')?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createFormEditTemplate(this.#point, this.#destinations, this.#offers);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
