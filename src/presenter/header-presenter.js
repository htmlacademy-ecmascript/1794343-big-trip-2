import FilterPresenter from './filter-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #eventModel = null;
  #filterModel = null;
  #headerContainer = null;
  #filtersContainer = null;
  #tripInfoComponent = new TripInfoView();

  constructor({headerContainer, filtersContainer, eventModel, filterModel}) {
    this.#headerContainer = headerContainer;
    this.#filtersContainer = filtersContainer;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;
  }

  init() {
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    this.#renderFilters();
  }

  #renderFilters () {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#filtersContainer,
      filterModel: this.#filterModel,
      eventModel: this.#eventModel
    });
    filterPresenter.init();
  }
}
