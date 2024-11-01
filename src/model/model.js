import { EVENTS_COUNT } from '../const.js';
import { destinations } from '../mock/destinations.js';
import { offers } from '../mock/offers.js';
import { getRandomPoint } from '../mock/points.js';

export default class EventModel {
  #points = [];
  #destinations = [];
  #offers = [];
  constructor() {
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
}
