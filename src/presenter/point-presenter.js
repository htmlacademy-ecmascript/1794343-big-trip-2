import FormEditView from '../view/form-edit-view.js';
import WayPointView from '../view/way-point-view.js';
import {render, replace} from '../framework/render.js';

export default class PointPresenter {
  #pointContainer = null;
  #pointComponent = null;
  #formEditComponent = null;

  #point = [];
  #destinations = [];
  #offers = [];

  constructor({pointContainer}) {
    this.#pointContainer = pointContainer;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#pointComponent = new WayPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onRollupBtnClick: this.#handleRollupBtnClick
    });

    this.#formEditComponent = new FormEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit
    });

    render(this.#pointComponent, this.#pointContainer);
  }

  #replaceEventToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToEvent() {
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #handleRollupBtnClick = () => {
    this.#replaceEventToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToEvent();
  };
}
