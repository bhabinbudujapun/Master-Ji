// Ensures that the script runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const moodOptions = document.querySelectorAll(".mood-label");
  const daysContainer = document.querySelector(".days");
  const monthTitle = document.querySelector(".month-title");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentDate = new Date();
  let selectedDate = new Date();
  let moods = JSON.parse(localStorage.getItem("moodLogs")) || {};

  // Function to dynamically create and update the calendar display
  function renderCalendar() {
    daysContainer.innerHTML = "";
    monthTitle.textContent = currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const totalDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Creating empty divs for padding before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("day", "empty");
      daysContainer.appendChild(emptyDiv);
    }

    // Looping through days to populate the calendar
    for (let i = 1; i <= totalDays; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayDiv.dataset.date = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${i}`;

      const dayNumber = document.createElement("div");
      dayNumber.classList.add("day-number");
      dayNumber.textContent = i;
      dayDiv.appendChild(dayNumber);

      // Adding mood emoji if it exists for the date
      if (moods[dayDiv.dataset.date]) {
        const moodEmoji = document.createElement("div");
        moodEmoji.classList.add("mood");
        moodEmoji.textContent = moods[dayDiv.dataset.date];
        dayDiv.appendChild(moodEmoji);
      }

      // Event listener for selecting a date
      dayDiv.addEventListener("click", () => {
        selectedDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          i
        );
        updateSelectedDate();
      });

      daysContainer.appendChild(dayDiv);
    }
  }

  function updateSelectedDate() {
    document.querySelector(".day-title").textContent =
      selectedDate.toDateString();
  }

  // Event listener for selecting a mood and storing it in localStorage
  moodOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      const selectedMood = e.target.textContent;
      const dateKey = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
      moods[dateKey] = selectedMood;
      localStorage.setItem("moodLogs", JSON.stringify(moods));
      renderCalendar();
    });
  });

  // Event listener for navigating to the previous month and updating the calendar
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  // Event listener for navigating to the next month and updating the calendar
  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
  updateSelectedDate();
});
