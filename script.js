const weatherData = {
  current: {
    temp: 68,
    condition: "Sunny with light wind",
    humidity: "21%",
    wind: "9 mph",
    uv: "7 high",
    rain: "4%",
  },
  forecast: [
    { day: "Fri", high: 68, low: 41, note: "clear", highlight: true },
    { day: "Sat", high: 71, low: 43, note: "breezy" },
    { day: "Sun", high: 66, low: 39, note: "cool dawn" },
    { day: "Mon", high: 73, low: 46, note: "dry heat" },
    { day: "Tue", high: 70, low: 44, note: "thin clouds" },
  ],
  hourly: [
    { hour: "2 PM", temp: 68, level: 82 },
    { hour: "4 PM", temp: 70, level: 88 },
    { hour: "6 PM", temp: 65, level: 72 },
    { hour: "8 PM", temp: 57, level: 48 },
    { hour: "10 PM", temp: 50, level: 31 },
  ],
  notes: [
    "Morning sun arrives fast; interior spaces warm before the streets do.",
    "Low humidity keeps the air comfortable, but exposed skin dries quickly.",
    "The palette leans earthy, keeping sky accents reserved for actionable data.",
  ],
};

const currentTemp = document.querySelector("#current-temp");
const currentCondition = document.querySelector("#current-condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const uv = document.querySelector("#uv");
const rain = document.querySelector("#rain");
const forecastGrid = document.querySelector("#forecast-grid");
const hourlyList = document.querySelector("#hourly-list");
const notesList = document.querySelector("#notes-list");
const chips = document.querySelectorAll(".chip");
const panels = document.querySelectorAll("[data-panel]");

function renderCurrent() {
  currentTemp.textContent = `${weatherData.current.temp}\u00b0`;
  currentCondition.textContent = weatherData.current.condition;
  humidity.textContent = weatherData.current.humidity;
  wind.textContent = weatherData.current.wind;
  uv.textContent = weatherData.current.uv;
  rain.textContent = weatherData.current.rain;
}

function renderForecast() {
  forecastGrid.innerHTML = weatherData.forecast
    .map(
      ({ day, high, low, note, highlight }) => `
        <article class="forecast-card${highlight ? " is-highlight" : ""}">
          <p class="label">${day}</p>
          <div class="forecast-icon" aria-hidden="true"></div>
          <p class="range">${high}\u00b0 / ${low}\u00b0</p>
          <p>${note}</p>
        </article>
      `,
    )
    .join("");
}

function renderHourly() {
  hourlyList.innerHTML = weatherData.hourly
    .map(
      ({ hour, temp, level }) => `
        <article class="hour-row">
          <strong>${hour}</strong>
          <div class="bar" aria-hidden="true"><span style="width: ${level}%"></span></div>
          <span class="hour-temp">${temp}\u00b0</span>
        </article>
      `,
    )
    .join("");
}

function renderNotes() {
  notesList.innerHTML = weatherData.notes.map((note) => `<li>${note}</li>`).join("");
}

function setActiveView(view) {
  chips.forEach((chip) => {
    const isActive = chip.dataset.view === view;
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-muted", panel.dataset.panel !== view);
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    setActiveView(chip.dataset.view);
  });
});

renderCurrent();
renderForecast();
renderHourly();
renderNotes();
setActiveView("overview");
