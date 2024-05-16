//Capitalizes the first letter in each word
export const capitalizeFirstLetter = (str) =>
  str
    ? str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
