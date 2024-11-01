import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import SortingView from '../view/soritng-view.js';
import WayPointView from '../view/way-point-view.js';
import {render, replace} from '../framework/render.js';
//import { getDefaultPoint } from '../const.js';

export default class Presenter {
  #container = null;
  #eventModel = null;
  #sortingComponent = new SortingView();
  #eventListComponent = new EventListView();

  constructor({container, eventModel}) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init() {
    const points = this.#eventModel.points;
    const destinations = this.#eventModel.destinations;
    const offers = this.#eventModel.offers;

    render(this.#sortingComponent, this.#container);
    render(this.#eventListComponent, this.#container);
    //render(new FormEditView(getDefaultPoint(), destinations, offers), this.#eventListComponent.element);
    //render(new FormEditView(points[1], destinations, offers), this.#eventListComponent.element);

    for (const point of points) {
      this.#renderPoint(point, destinations, offers);
    }
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new WayPointView({
      point,
      destinations,
      offers,
      onRollupBtnClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formEditComponent = new FormEditView({
      point,
      destinations,
      offers,
      onFormSubmit: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToForm() {
      replace(formEditComponent, pointComponent);
    }
    function replaceFormToEvent() {
      replace(pointComponent, formEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }
}
