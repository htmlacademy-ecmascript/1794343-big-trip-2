import EventModel from './model/model.js';
import Presenter from './presenter/presenter.js';
import FiltersView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import NewEventBtnView from './view/new-event-btn-view.js';
import FormEditView from './view/form-edit-view.js';
import { render, remove, RenderPosition } from './framework/render.js';
import { generateFilter } from './mock/filter.js';
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

const filters = generateFilter(eventModel.points);
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

render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), siteFiltersElement);
render(newEventBtn, siteHeaderElement);
