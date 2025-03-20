const days = document.querySelector(".days");
const viewButton = document.querySelectorAll(".view-selector");
const views = document.querySelectorAll(".day-view, .week-view, .month-view");

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

function displayCalendar() {
  //Month and Year - title
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const monthYearTitle = document.querySelector(".month-title");
  monthYearTitle.innerText = `${monthName}, ${year}`;

  // Empty days at start of month
  for (let i = 0; i < day; i++) {
    const div = document.createElement("div");
    div.classList.add("day", "empty");
    days.appendChild(div);
  }

  //  Days with moods
  let numberOfDays = getDaysInMonth(year, month + 1);
  for (let i = 1; i <= numberOfDays; i++) {
    const div = document.createElement("div");
    i === currentDate // Select Currect Date
      ? div.classList.add("day", "today")
      : div.classList.add("day");
    const dayNumber = document.createElement("div");
    dayNumber.innerText = i;
    dayNumber.classList.add("day-number");
    div.appendChild(dayNumber);
    days.appendChild(div);
  }
}

displayCalendar();

// Basic view toggling functionality
viewButton.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and views
    viewButton.forEach((btn) => btn.classList.remove("active"));
    views.forEach((view) => {
      view.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");

    // Show corresponding view
    if (button.innerText === "Day") views[0].classList.add("active");
    if (button.innerText === "Week") views[1].classList.add("active");
    if (button.innerText === "Month") views[2].classList.add("active");
  });
});
