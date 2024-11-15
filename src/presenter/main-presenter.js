import EventListView from '../view/event-list-view.js';
import SortingView from '../view/soritng-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { sortDate, sortPrice, sortTime } from '../utils/event.js';
import { SortingType, UpdateType, UserAction } from '../const.js';

export default class Presenter {
  #container = null;
  #eventModel = null;

  #sortingComponent = null;
  #eventListComponent = new EventListView();
  #noEventsComponent = new EmptyListView();
  #pointPresenters = new Map();
  #currentSortType = SortingType.DAY;

  constructor({container, eventModel}) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortingType.DAY:
        return [...this.#eventModel.points].sort(sortDate);
      case SortingType.PRICE:
        return [...this.#eventModel.points].sort(sortPrice);
      case SortingType.TIME:
        return [...this.#eventModel.points].sort(sortTime);
    }
    return this.#eventModel.points;
  }

  get destinations() {
    return this.#eventModel.destinations;
  }

  get offers() {
    return this.#eventModel.offers;
  }

  init() {
    this.#renderMainInfo();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#eventModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#eventModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderEventListItems();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList({resetSortType: true});
        this.#renderEventListItems();
        break;
    }
  };

  #handleSortTypeChange = (sortingType) => {
    if (this.#currentSortType === sortingType) {
      return;
    }
    this.#currentSortType = sortingType;
    this.#clearEventList();
    this.#renderEventListItems();
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortingComponent, this.#container);
  }

  #renderPoint (point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEventListItems () {
    for (const point of this.points) {
      this.#renderPoint(point, this.destinations, this.offers);
    }
  }

  #renderEventList () {
    render(this.#eventListComponent, this.#container);
  }

  #clearEventList ({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#noEventsComponent);

    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
      remove(this.#sortingComponent);
    }
  }

  #renderEmptyList () {
    if (this.points.length === 0) {
      render(this.#noEventsComponent, this.#eventListComponent.element);
    }
  }

  #renderMainInfo () {
    this.#renderSorting();
    this.#renderEventList();
    this.#renderEventListItems();
    this.#renderEmptyList();
  }
}
