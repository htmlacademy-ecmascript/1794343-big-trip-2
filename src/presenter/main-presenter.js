import EventListView from '../view/event-list-view.js';
import SortingView from '../view/soritng-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class Presenter {
  #container = null;
  #eventModel = null;
  #sortingComponent = new SortingView();
  #eventListComponent = new EventListView();
  #noEventsComponent = new EmptyListView();

  constructor({container, eventModel}) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init() {
    const points = this.#eventModel.points;
    const destinations = this.#eventModel.destinations;
    const offers = this.#eventModel.offers;

    this.#renderMainInfo(points, destinations, offers);
  }

  #renderSorting() {
    render(this.#sortingComponent, this.#container);
  }

  #renderPoint (point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element
    });
    pointPresenter.init(point, destinations, offers);
  }

  #renderEventListItems (points, destinations, offers) {
    for (const point of points) {
      this.#renderPoint(point, destinations, offers);
    }
  }

  #renderEventList () {
    render(this.#eventListComponent, this.#container);
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
