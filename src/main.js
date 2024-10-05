import FirstPresenter from './presenter/first-presenter';
import FiltersView from './view/filter-view';
import TripInfoView from './view/trip-info-view';
import { render, RenderPosition } from './render';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const presenter = new FirstPresenter({container: siteMainElement});
presenter.init();

render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteFiltersElement);
