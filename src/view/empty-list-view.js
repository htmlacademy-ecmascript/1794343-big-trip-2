import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const MessageWithoutEvent = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  LOADING_MESSAGE: 'Loading...',
  DATA_LOADING_ERROR: 'Failed to load latest route information'
};

function createEmptyListTemplate(filterType, isDataLoadingError, isLoading) {
  const getMessage = function () {
    if (isDataLoadingError) {
      return MessageWithoutEvent.DATA_LOADING_ERROR;
    }
    if (isLoading) {
      return MessageWithoutEvent.LOADING_MESSAGE;
    }
    return MessageWithoutEvent[filterType];
  };

  return `<p class="trip-events__msg">${getMessage()}</p>`;
}
export default class EmptyListView extends AbstractView {
  #filterType = null;
  #isDataLoadingError;
  #isLoading;

  constructor({filterType, isDataLoadingError, isLoading}) {
    super();
    this.#filterType = filterType;
    this.#isDataLoadingError = isDataLoadingError;
    this.#isLoading = isLoading;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType, this.#isDataLoadingError, this.#isLoading);
  }
}
