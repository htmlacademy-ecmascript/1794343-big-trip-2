import AbstractView from '../framework/view/abstract-view.js';
//import { SORTING_TYPES } from '../const.js';
import { SortingType } from '../const.js';
import { makeFirstCharBig } from '../utils/common.js';

function createSortingTemplate (currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${Object.values(SortingType).map((type) => `<div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio"
              name="trip-sort" value="sort-${type}"
              ${type === 'event' || type === 'offers' ? 'disabled' : ''}
              ${type === currentSortType ? 'checked' : ''}
              data-sort-type="${type}">
              <label class="trip-sort__btn" for="sort-${type}">${makeFirstCharBig(type)}</label>
            </div>`).join('')}
          </form>`;
}
export default class SortingView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
