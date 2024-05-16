export const capitalizeFirstLetter = (str) => {
  if (!str) return '';

  str = str.toLowerCase();

  return str[0].toUpperCase() + str.slice(1);
};
