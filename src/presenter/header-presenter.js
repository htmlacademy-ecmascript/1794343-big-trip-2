import FiltersView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { generateFilter } from '../mock/filter.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #eventModel = null;
  #headerContainer = null;
  #filtersContainer = null;
  #tripInfoComponent = new TripInfoView();

  constructor({headerContainer, filtersContainer, eventModel}) {
    this.#headerContainer = headerContainer;
    this.#filtersContainer = filtersContainer;
    this.#eventModel = eventModel;
  }

  init() {
    const points = this.#eventModel.points;
    const filters = generateFilter(points);
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView({filters}), this.#filtersContainer);
  }
}
