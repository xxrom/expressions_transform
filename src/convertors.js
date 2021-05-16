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

export const stringToFloat = (string) => {
  const value = String(string).replace(/,/, '.').trim();

  return parseFloat(value, 10);
}

export const stringToInt = (string) => {
  const value = stringToFloat(string);

  return parseInt(value, 10);
}

