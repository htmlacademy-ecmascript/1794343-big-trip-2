import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
export default class HeaderPresenter {
  #eventModel = null;
  #headerContainer = null;
  #tripInfoComponent = null;

  constructor({headerContainer, eventModel}) {
    this.#headerContainer = headerContainer;
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const points = this.#eventModel.points;
    if (points.length > 0) {
      this.#renderTripInfo();
    }
    if (points.length === 0) {
      remove(this.#tripInfoComponent);
    }
  }

  #renderTripInfo() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      points: this.#eventModel.points,
      destinations: this.#eventModel.destinations,
      offers: this.#eventModel.offers,
    });
    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
