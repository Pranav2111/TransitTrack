export const toTitleCase = str =>
  str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const formatDate = dateString => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  if (isNaN(date)) {
    return '';
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  let formattedDate = date.toLocaleString('en-GB', options);
  formattedDate = formattedDate
    .replace(',', '')
    .replace('AM', 'AM')
    .replace('PM', 'PM');

  return formattedDate;
};
