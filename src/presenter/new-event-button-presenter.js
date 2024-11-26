import NewEventBtnView from '../view/new-event-btn-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class NewEventButtonPresenter {
  #eventModel = null;
  #headerContainer = null;
  #newEventButtonComponent = null;
  #onBtnClick;

  constructor({headerContainer, eventModel, onBtnClick}) {
    this.#headerContainer = headerContainer;
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#onBtnClick = onBtnClick;
  }

  init() {
    this.#renderNewEventBtn();
  }

  disableButton() {
    this.#newEventButtonComponent.element.disabled = true;
  }

  undisableButton() {
    this.#newEventButtonComponent.element.disabled = false;
  }


  #renderNewEventBtn() {
    const prevNewEventButtonComponent = this.#newEventButtonComponent;
    this.#newEventButtonComponent = new NewEventBtnView({
      destinations: this.#eventModel.destinations,
      offers: this.#eventModel.offers,
      onClick: this.#onBtnClick
    });

    if (prevNewEventButtonComponent === null) {
      render(this.#newEventButtonComponent, this.#headerContainer);
      return;
    }
    replace(this.#newEventButtonComponent, prevNewEventButtonComponent);
    remove(prevNewEventButtonComponent);
    render(this.#newEventButtonComponent, this.#headerContainer);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
