import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import Presenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import NewEventBtnView from './view/new-event-btn-view.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const eventModel = new EventModel();
const filterModel = new FilterModel();

const presenter = new Presenter({
  container: siteMainElement,
  eventModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const headerPresenter = new HeaderPresenter({
  headerContainer: siteHeaderElement,
  filtersContainer: siteFiltersElement,
  eventModel,
  filterModel
});

const newEventBtn = new NewEventBtnView({
  onClick: () => {
    presenter.createPoint();
    newEventBtn.element.disabled = true;
  }
});

function handleNewPointFormClose() {
  newEventBtn.element.disabled = false;
}

render(newEventBtn, siteHeaderElement);

eventModel.init();
presenter.init();
headerPresenter.init();
