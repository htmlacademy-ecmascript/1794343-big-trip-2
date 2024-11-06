import EventModel from './model/model.js';
import Presenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import NewEventBtnView from './view/new-event-btn-view.js';
import FormEditView from './view/form-edit-view.js';
import { render, remove, RenderPosition } from './framework/render.js';
import { getDefaultPoint } from './const.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const eventModel = new EventModel();
eventModel.init();

const presenter = new Presenter({
  container: siteMainElement,
  eventModel: eventModel});
presenter.init();

const headerPresenter = new HeaderPresenter({
  headerContainer: siteHeaderElement,
  filtersContainer: siteFiltersElement,
  eventModel: eventModel
});
headerPresenter.init();

const formEditComponent = (new FormEditView({
  point: getDefaultPoint()
}));

const escKeyDownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    remove(formEditComponent);
    document.removeEventListener('keydown', escKeyDownHandler);
  }
};
const newEventBtn = new NewEventBtnView({
  onClick: () => {
    render(formEditComponent, siteMainElement, RenderPosition.BEFOREBEGIN);
    document.addEventListener('keydown', escKeyDownHandler);
  }
});

render(newEventBtn, siteHeaderElement);
