import { remove, render, RenderPosition } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import { UserAction, UpdateType } from '../const.js';
import { getDefaultPoint } from '../const.js';
export default class NewPointPresenter {
  #destinations = [];
  #offers = [];
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #formEditComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(offers, destinations, pointListContainer) {
    this.#pointListContainer = pointListContainer;
    if (this.#formEditComponent !== null) {
      return;
    }
    this.#offers = offers;
    this.#destinations = destinations;
    this.#formEditComponent = new FormEditView({
      point: getDefaultPoint(),
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });
    render(this.#formEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formEditComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#formEditComponent);
    this.#formEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#formEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#formEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#formEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
