import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

function getMinDate (points2) {
  const arr = points2.map((point) => (
    dayjs(point.dateFrom)));
  return dayjs.min(arr);
}

function getMaxDate (points2) {
  const arr = points2.map((point) => (
    dayjs(point.dateTo)));
  return dayjs.max(arr);
}

function getDestinationName (point, destinations) {
  const {destination} = point;
  return destinations.find((dest) => dest.id === destination).name;
}

function getTotalPrice (points, offers) {
  let totalPrice = 0;

  points.forEach((point) => {
    totalPrice += point.basePrice;

    const eventOffers = offers.find((offer) => offer.type === point.type);

    point.offers.forEach((selectedOffer) => {
      totalPrice += eventOffers.offers.find((offer) => offer.id === selectedOffer).price;
    });
  });

  return totalPrice;
}

export { getMinDate, getMaxDate, getDestinationName, getTotalPrice};
