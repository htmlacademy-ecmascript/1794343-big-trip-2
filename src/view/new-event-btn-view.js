import AbstractView from '../framework/view/abstract-view.js';

function createNewEventBtnTemplate(destinations, offers) {
  const isDisabled = (destinations.length === 0) || (offers.length === 0);
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button"
          ${isDisabled ? 'disabled' : ''}>
          New event</button>`;
}
export default class NewEventBtnView extends AbstractView {
  #destinations = [];
  #offers = [];
  #handleClick = null;
  constructor({destinations, offers, onClick}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewEventBtnTemplate(this.#destinations, this.#offers);
  }

  #clickHandler = () => {
    this.#handleClick();
  };
}
