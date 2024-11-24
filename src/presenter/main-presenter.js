import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/soritng-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import FailedLoadDataView from '../view/failed-load-data.js';
import { render, remove, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presener.js';
import { sortDate, sortPrice, sortTime } from '../utils/event.js';
import { SortingType, UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import { filter } from '../utils/filter.js';

export default class MainPresenter {
  #container = null;
  #eventModel = null;
  #filterModel = null;

  #loadingComponent = new LoadingView();
  #failedLoadDataComponent = new FailedLoadDataView();
  #sortingComponent = null;
  #eventListComponent = new EventListView();
  #noEventsComponent = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortingType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({container, eventModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#eventModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortingType.DAY:
        return filteredPoints.sort(sortDate);
      case SortingType.PRICE:
        return filteredPoints.sort(sortPrice);
      case SortingType.TIME:
        return filteredPoints.sort(sortTime);
    }
    return filteredPoints;
  }

  get destinations() {
    return this.#eventModel.destinations;
  }

  get offers() {
    return this.#eventModel.offers;
  }

  init() {
    this.#renderEventListItems();
  }

  createPoint() {
    this.#currentSortType = SortingType.DAY;
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    if (this.points.length === 0) {
      remove(this.#noEventsComponent);
      this.#renderEventList();
    }
    this.#newPointPresenter.init(this.offers, this.destinations, this.#eventListComponent.element);
  }


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#eventModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#eventModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#eventModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderEventListItems();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList({resetSortType: true});
        this.#renderEventListItems();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEventListItems();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#sortingComponent);
        this.#clearEventList();
        this.#renderFailedLoadDataMessage();
        break;
    }
  };

  #handleSortTypeChange = (sortingType) => {
    if (this.#currentSortType === sortingType) {
      return;
    }
    this.#currentSortType = sortingType;
    this.#clearEventList();
    this.#renderEventListItems();
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint (point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEventListItems () {
    remove(this.#failedLoadDataComponent);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSorting();
    this.#renderEventList();

    if (this.points.length === 0) {
      this.renderEmptyList();
      return;
    }

    for (const point of this.points) {
      this.#renderPoint(point, this.destinations, this.offers);
    }
  }

  #renderEventList () {
    render(this.#eventListComponent, this.#container);
  }

  #clearEventList ({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortingComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
    }

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderFailedLoadDataMessage() {
    render(this.#failedLoadDataComponent, this.#container);
  }

  renderEmptyList () {
    this.#noEventsComponent = new EmptyListView({
      filterType: this.#filterType
    });
    remove(this.#sortingComponent);
    remove(this.#eventListComponent);
    render(this.#noEventsComponent, this.#container);
  }
}
