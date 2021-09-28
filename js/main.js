function getRandomNumber(min, max) {
  if (min < max && min >= 0 && max > 0 ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new RangeError('Ошибочные значения диапозона: первое значение должно быть меньше второго, а также диапозон может быть только положительный, включая ноль');
}
getRandomNumber(3, 19);

function getRandomGeographicalCoordinates(min, max, simbolsAfterComma) {
  if (min < max && min >= 0 && max > 0 && simbolsAfterComma >= 0 && Number.isInteger(simbolsAfterComma)) {
    return ((Math.random() * (max - min)) + min).toFixed(simbolsAfterComma);
  }
  throw new RangeError('Ошибочные значения диапозона или количества цифр после запятой: первое значение должно быть меньше второго, а также диапозон может быть только положительный, включая нолью, также диапазон может быть в десятых, сотых, тысячных и т. д. долях. Количество цифр после десятичной запятой может быть целое число между 0 и 20 включительно');
}
getRandomGeographicalCoordinates(1.1, 1.2, 3);
