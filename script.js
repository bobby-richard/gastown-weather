const temperatureEl = document.querySelector("#temperature");
const unitLabelEl = document.querySelector("#unit-label");
const toggleEl = document.querySelector("#units-toggle");
const timestampEl = document.querySelector("#timestamp");

const state = {
  celsius: 18,
  useFahrenheit: false,
};

function renderTemperature() {
  const value = state.useFahrenheit
    ? Math.round((state.celsius * 9) / 5 + 32)
    : state.celsius;

  temperatureEl.textContent = String(value);
  unitLabelEl.textContent = state.useFahrenheit ? "°F" : "°C";
  toggleEl.textContent = state.useFahrenheit ? "Switch to C" : "Switch to F";
}

function renderTimestamp() {
  const now = new Date();
  timestampEl.textContent = `Updated ${now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

toggleEl.addEventListener("click", () => {
  state.useFahrenheit = !state.useFahrenheit;
  renderTemperature();
});

renderTemperature();
renderTimestamp();
