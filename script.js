const myURL = "D:\to_do_listcards-data";

const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const rate = document.getElementById("rate");

const editButton = document.getElementById("edit-button");
const addButton = document.getElementById("add-button");
const saveButton = document.getElementById("save-button");

const dialogAddWindow = document.getElementById("add-task-dialog");
const inputTitle = document.getElementById("get-task-title");

async function fetchWeatherData() {
  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=53.55&lon=27.33&appid=0a7d636a97a3858fc7eeb7f659688885";
  try {
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    renderWeatherData(weatherData);
  } catch (error) {
    console.log("error");
  }
}

function renderWeatherData(data) {
  const {
    weather: [{ icon: wicon }],
    main: { temp: wt },
  } = data;

  icon.src = "https://openweathermap.org/img/wn/" + wicon + ".png";
  temp.textContent = (wt - 273).toFixed(1) + "°C";
}

async function fetchRateData() {
  const rateUrl = "https://api.nbrb.by/exrates/rates/431";

  try {
    const rateResponse = await fetch(rateUrl);
    const rateData = await rateResponse.json();
    renderRateData(rateData);
  } catch (error) {
    console.log("error");
  }
}

function renderRateData(data) {
  const { Cur_OfficialRate: drate } = data;

  rate.textContent = drate;
}

function onAddClick() {
  dialogAddWindow.showModal();
}

async function fetchAddData() {
  localStorage.setItem(
    "cards",
    JSON.stringify([{ id: "1", title: inputTitle.value }])
  );
  for (let i = 0; i < JSON.parse(localStorage.getItem("cards")).length; i++) {
    let { id: idValue, title: titleValue } = JSON.parse(
      localStorage.getItem("cards")
    )[i];
    console.log("id: " + idValue + " title: " + titleValue);
  }
  dialogAddWindow.close();
}

function onSaveClick() {
  fetchAddData();
}

addButton.addEventListener("click", onAddClick);
saveButton.addEventListener("click", onSaveClick);
(function () {
  fetchWeatherData();
  fetchRateData();
})();
