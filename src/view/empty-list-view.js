import AbstractView from '../framework/view/abstract-view.js';
import { MessageWithoutEvent } from '../const.js';

function createEmptyListTemplate() {
  return `<p class="trip-events__msg">${MessageWithoutEvent.EVERYTHING}</p>`;
}
export default class EmptyListView extends AbstractView {
  get template() {
    return createEmptyListTemplate();
  }
}
