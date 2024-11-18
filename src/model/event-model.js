import Observable from '../framework/observable.js';
import { EVENTS_COUNT } from '../const.js';
import { destinations } from '../mock/destinations.js';
import { offers } from '../mock/offers.js';
import { getRandomPoint } from '../mock/points.js';

export default class EventModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  constructor() {
    super();
    this.#points = [];
    this.#destinations = [];
    this.#offers = [];
  }

  init() {
    this.#points = Array.from({length: EVENTS_COUNT}, getRandomPoint);
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
