import AbstractView from '../framework/view/abstract-view.js';
import { SORTING_TYPES } from '../const.js';
import { makeFirstCharBig } from '../utils/common.js';

const createSortingTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${SORTING_TYPES.map((type, index) => `<div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"
              ${type === 'event' || type === 'offers' ? 'disabled' : ''}
              ${index === 0 ? 'checked' : ''}
              data-sort-type="${type}">
              <label class="trip-sort__btn" for="sort-${type}">${makeFirstCharBig(type)}</label>
            </div>`).join('')}
          </form>`;
export default class SortingView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
