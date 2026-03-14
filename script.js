const state = {
  unit: "f",
  daypart: "day",
};

function formatTemp(value) {
  return `${value}°`;
}

function updateUnitButtons() {
  document.querySelectorAll("[data-unit]").forEach((button) => {
    const active = button.dataset.unit === state.unit;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function updateTemps() {
  document.querySelectorAll("[data-temp-f]").forEach((node) => {
    const nextValue = state.unit === "f" ? node.dataset.tempF : node.dataset.tempC;
    node.textContent = String(nextValue);
  });

  document.querySelectorAll(".forecast-panel").forEach((panel) => {
    const key = state.daypart === "day" ? "dayTemp" : "nightTemp";
    const value = state.unit === "f" ? panel.dataset[`${key}F`] : panel.dataset[`${key}C`];
    panel.querySelector(".forecast-temp").textContent = formatTemp(value);
  });
}

function updateDaypartButtons() {
  document.querySelectorAll("[data-daypart]").forEach((button) => {
    const active = button.dataset.daypart === state.daypart;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function updateForecastCopy() {
  document.querySelectorAll(".forecast-panel").forEach((panel) => {
    const text = panel.querySelector(".forecast-text");
    text.textContent =
      state.daypart === "day" ? text.dataset.dayCopy : text.dataset.nightCopy;
  });
}

function render() {
  updateUnitButtons();
  updateTemps();
  updateDaypartButtons();
  updateForecastCopy();
}

document.querySelectorAll("[data-unit]").forEach((button) => {
  button.addEventListener("click", () => {
    state.unit = button.dataset.unit;
    render();
  });
});

document.querySelectorAll("[data-daypart]").forEach((button) => {
  button.addEventListener("click", () => {
    state.daypart = button.dataset.daypart;
    render();
  });
});

render();
