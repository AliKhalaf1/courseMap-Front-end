const dateToString = (date) => {
  return (
    date.day.low +
    '/' +
    date.month.low +
    '/' +
    date.year.low +
    '  ' +
    date.hour.low +
    ':' +
    date.minute.low
  );
};

const typeToString = (type) => {
  return type === 'lec' ? 'Lecture' : 'Tutorial';
};

const timeToString = (time) => {
  return (
    'Group:' +
    time.group +
    ' ' +
    time.day +
    ' ' +
    typeToString(time.type) +
    ' ' +
    time.startTime +
    ':' +
    time.endTime
  );
};

const globalFunctions = {
  dateToString,
  timeToString,
  typeToString
};
export default globalFunctions;
