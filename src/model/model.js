import { EVENTS_COUNT } from '../const';
import { destinations } from '../mock/destinations';
import { offers } from '../mock/offers';
import { getRandomPoint } from '../mock/points';

export default class EventModel {
  constructor() {
    this.points = [];
    this.destinations = [];
    this.offers = [];
  }

  init() {
    this.points = Array.from({length: EVENTS_COUNT}, getRandomPoint);
    this.destinations = destinations;
    this.offers = offers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
