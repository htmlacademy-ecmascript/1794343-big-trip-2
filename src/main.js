import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonPresenter from './presenter/new-event-button-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic hSrfrololooldyj';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const eventModel = new EventModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const presenter = new MainPresenter({
  container: siteMainElement,
  eventModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const headerPresenter = new HeaderPresenter({
  headerContainer: siteHeaderElement,
  eventModel,
});

const newEventBtnPresenter = new NewEventButtonPresenter({
  headerContainer: siteHeaderElement,
  eventModel,
  onBtnClick: handleNewPointBtnClick
});

function handleNewPointFormClose() {
  newEventBtnPresenter.undisableButton();
  if (eventModel.points.length === 0) {
    presenter.renderEmptyList();
  }
}

function handleNewPointBtnClick() {
  presenter.createPoint();
  newEventBtnPresenter.disableButton();
}


const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  eventModel,
  filterModel,
});

eventModel.init();
newEventBtnPresenter.init();
filterPresenter.init();
presenter.init();
headerPresenter.init();
