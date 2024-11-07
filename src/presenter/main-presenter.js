import EventListView from '../view/event-list-view.js';
import SortingView from '../view/soritng-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortDate, sortPrice, sortTime } from '../utils/event.js';
import { SortingType } from '../const.js';

export default class Presenter {
  #points = [];
  #destinations = [];
  #offers = [];

  #container = null;
  #eventModel = null;

  #sortingComponent = null;
  #eventListComponent = new EventListView();
  #noEventsComponent = new EmptyListView();
  #pointPresenters = new Map();
  #currentSortType = SortingType.DAY;
  #sourcedPoints = [];

  constructor({container, eventModel}) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init() {
    this.#points = this.#eventModel.points;
    this.#sourcedPoints = [...this.#eventModel.points];
    this.#destinations = this.#eventModel.destinations;
    this.#offers = this.#eventModel.offers;

    this.#renderMainInfo(this.#points, this.#destinations, this.#offers);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  };

  #sortPoints(sortingType) {
    switch (sortingType) {
      case SortingType.DAY:
        this.#points.sort(sortDate);
        break;
      case SortingType.PRICE:
        this.#points.sort(sortPrice);
        break;
      case SortingType.TIME:
        this.#points.sort(sortTime);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortingType;
  }

  #handleSortTypeChange = (sortingType) => {
    if (this.#currentSortType === sortingType) {
      return;
    }
    this.#sortPoints(sortingType);
    this.#clearEventList();
    this.#renderEventListItems(this.#points, this.#destinations, this.#offers);
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortingComponent, this.#container);
  }

  #renderPoint (point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEventListItems (points, destinations, offers) {
    for (const point of points) {
      this.#renderPoint(point, destinations, offers);
    }
  }

  #renderEventList () {
    render(this.#eventListComponent, this.#container);
  }

  #clearEventList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderEmptyList (points) {
    if (points.length === 0) {
      render(this.#noEventsComponent, this.#eventListComponent.element);
    }
  }

  #renderMainInfo (points, destinations, offers) {
    this.#renderSorting();
    this.#renderEventList();
    this.#renderEventListItems(points, destinations, offers);
    this.#renderEmptyList(points);
  }
}
