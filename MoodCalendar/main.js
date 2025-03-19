let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let currentDate = date.getDate();
let day = date.getDay();

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

function dateOfDays(year, month, day) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[dayOfWeek];
}

let dateOfDay = dateOfDays(year, month, currentDate);
console.log(dateOfDay);
let numberOfDays = getDaysInMonth(year, month + 1);
console.log(year, month + 1, currentDate, numberOfDays, day + 1);
