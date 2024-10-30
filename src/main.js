import EventModel from './model/model.js';
import Presenter from './presenter/presenter.js';
import FiltersView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import { render, RenderPosition } from './framework/render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteFiltersElement);

const eventModel = new EventModel();
eventModel.init();

const presenter = new Presenter({
  container: siteMainElement,
  eventModel: eventModel});
presenter.init();
