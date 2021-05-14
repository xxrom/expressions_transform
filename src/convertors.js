export const stringToBoolean = (string) => {
  const value = String(string).trim().toLowerCase();

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return null;
}
console.log('stringToBoolean', stringToBoolean('true'), stringToBoolean('False'), stringToBoolean('fff'));

export const stringToFloat = (string) => {
  const value = String(string).replace(/,/, '.').trim();

  return parseFloat(value, 10);
}
console.log('stringToFloat', stringToFloat('1.222'), stringToFloat('1,222'), stringToFloat('fff'));

export const stringToInt = (string) => {
  const value = stringToFloat(string);

  return parseInt(value, 10);
}
console.log('stringToInt', stringToInt('1.222'), stringToInt('1,222'), stringToInt('fff'));

