import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import SortingView from '../view/soritng-view.js';
import WayPointView from '../view/way-point-view.js';
import {render} from '../render.js';

export default class FirstPresenter {
  sortingComponent = new SortingView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortingComponent, this.container);
    render(this.eventListComponent, this.container);
    render(new FormEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WayPointView(), this.eventListComponent.getElement());
    }
  }
}
