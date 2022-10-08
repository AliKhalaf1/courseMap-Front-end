const dateToString = (date) => {
  const mins =date.minute.low < 10? "0"+date.minute.low:date.minute.low
  return (
    date.day.low +
    '/' +
    date.month.low +
    '/' +
    date.year.low +
    '  ' +
    date.hour.low +
    ':' + mins
    
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
