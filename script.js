const myURL = "D:\to_do_listcards-data";

let idNum = 0;

const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const rate = document.getElementById("rate");

const cardsListUl = document.getElementById("cards-list-ul");
const editButton = document.getElementById("edit-button");
const addButton = document.getElementById("add-button");
const saveButton = document.getElementById("save-button");
const exitButton = document.getElementById("exit-button");

const editButtons = document.getElementsByClassName("task-edit");

const dialogAddWindow = document.getElementById("add-task-dialog");
const inputTitle = document.getElementById("get-task-title");
const inputDesc = document.getElementById("get-task-description");
const inputDeadline = document.getElementById("get-task-deadline");
const inputTags = document.getElementById("get-task-tags");
const inputStatus = document.getElementById("get-task-status");

function addFunc(element, fn) {
  element.addEventListener("click", fn);
}

function tagConversion(str) {
  const elements = str.trim().split(",");
  return elements.map(element => (element = "#" + element)).join(",");
}

class Card {
  id;
  title;
  description;
  deadline;
  tags;
  status;
  createdAt;
  updatedAt;
  action;
  timestamp;
  constructor(
    id,
    title,
    description,
    deadline,
    tags,
    status,
    createdAt,
    updatedAt,
    action,
    timestamp
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.tags = tags;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.action = action;
    this.timestamp = timestamp;
  }
}

class Cards {
  cardsList = [];
  addData(
    id,
    title,
    description,
    deadline,
    tags,
    status,
    createdAt,
    updatedAt,
    action,
    timestamp
  ) {
    const NewCard = new Card(
      id,
      title,
      description,
      deadline,
      tags,
      status,
      createdAt,
      updatedAt,
      action,
      timestamp
    );
    this.cardsList.push(NewCard);
  }

  submitAddData() {
    localStorage.setItem(
      "cards",
      JSON.stringify([
        {
          id: this.cardsList[this.cardsList.length - 1].id,
          title: this.cardsList[this.cardsList.length - 1].title,
          description: this.cardsList[this.cardsList.length - 1].description,
          deadline: this.cardsList[this.cardsList.length - 1].deadline,
          tags: this.cardsList[this.cardsList.length - 1].tags,
          status: this.cardsList[this.cardsList.length - 1].status,
          createdAt: this.cardsList[this.cardsList.length - 1].createdAt,
          updatedAt: this.cardsList[this.cardsList.length - 1].updatedAt,
          history: {
            action: this.cardsList[this.cardsList.length - 1].action,
            timestamp: this.cardsList[this.cardsList.length - 1].timestamp,
          },
        },
      ])
    );
    for (let i = 0; i < JSON.parse(localStorage.getItem("cards")).length; i++) {
      let {
        id: idValue,
        title: titleValue,
        description: descValue,
        deadline: deadlineValue,
        tags: tagsValue,
        status: statusValue,
        createdAt: createdAtValue,
        updatedAt: updatedAtValue,
        history: {action: actionValue, timestamp: timestampValue},
      } = JSON.parse(localStorage.getItem("cards"))[i];
      console.log(
        "id: " +
          idValue +
          "; title: " +
          titleValue +
          "; desc: " +
          descValue +
          "; deadline: " +
          deadlineValue +
          "; tags: " +
          tagsValue +
          "; status: " +
          statusValue +
          "; createdAt: " +
          createdAtValue +
          "; updatedAt: " +
          updatedAtValue +
          "; action: " +
          actionValue +
          "; timestamp: " +
          timestampValue
      );
    }

    dialogAddWindow.close();
  }

  renderSumbittedData() {
    let {
      id: idValue,
      title: titleValue,
      description: descValue,
      deadline: deadlineValue,
      tags: tagsValue,
      status: statusValue,
      createdAt: createdAtValue,
      updatedAt: updatedAtValue,
      history: {action: actionValue, timestamp: timestampValue},
    } = JSON.parse(localStorage.getItem("cards"))[
      JSON.parse(localStorage.getItem("cards")).length - 1
    ];

    const cardsListLi = document.createElement("li");

    const cardDiv = document.createElement("div");
    const cardTitle = document.createElement("p");
    const cardDesc = document.createElement("p");
    const cardTagDiv = document.createElement("div");
    const cardTagText = document.createElement("p");
    const cardBottomDiv = document.createElement("div");
    const cardEditButton = document.createElement("button");
    const cardDeleteButton = document.createElement("button");
    const cardStatusDiv = document.createElement("div");
    const cardStatusText = document.createElement("p");
    const cardDeadline = document.createElement("p");

    cardDiv.classList.add("card");
    cardTitle.classList.add("task-title");
    cardDesc.classList.add("task-desc");
    cardTagDiv.classList.add("task-tag");
    cardTagText.classList.add("task-tag-text");
    cardBottomDiv.classList.add("card-bottom");
    cardEditButton.classList.add("task-edit");
    cardDeleteButton.classList.add("task-delete");
    cardStatusDiv.classList.add("task-status");
    cardStatusText.classList.add("task-status-text");
    cardDeadline.classList.add("task-deadline");

    cardTitle.textContent = titleValue;
    cardDesc.textContent = descValue;
    cardTagText.textContent = tagConversion(tagsValue);
    cardStatusText.textContent = statusValue;
    cardDeadline.textContent = deadlineValue;

    cardDeleteButton.addEventListener("click", () => cardsListLi.remove());

    cardsListUl.append(cardsListLi);
    cardsListLi.append(cardDiv);
    cardDiv.append(cardTitle);
    cardDiv.append(cardDesc);
    cardDiv.append(cardTagDiv);
    cardTagDiv.append(cardTagText);
    cardDiv.append(cardBottomDiv);
    cardBottomDiv.append(cardEditButton);
    cardBottomDiv.append(cardDeleteButton);
    cardBottomDiv.append(cardStatusDiv);
    cardStatusDiv.append(cardStatusText);
    cardBottomDiv.append(cardDeadline);
  }
}

let MyCards = new Cards();

function getNowTime() {
  let date = new Date();
  return String(date.toISOString().slice(0, 10).replaceAll("-", ":"));
}

function onDeleteClick() {
  MyCards.deleteCard();
}
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
    weather: [{icon: wicon}],
    main: {temp: wt},
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
  const {Cur_OfficialRate: drate} = data;

  rate.textContent = drate;
}

function onAddClick() {
  dialogAddWindow.showModal();
}

function onSaveClick() {
  idNum++;

  MyCards.addData(
    idNum,
    inputTitle.value,
    inputDesc.value,
    inputDeadline.value,
    inputTags.value,
    inputStatus.value,
    getNowTime(),
    getNowTime(),
    "created",
    getNowTime()
  );
  MyCards.submitAddData();
  MyCards.renderSumbittedData();
}

function onExitClick() {
  dialogAddWindow.close();
}

saveButton.addEventListener("click", onSaveClick);
addButton.addEventListener("click", onAddClick);
exitButton.addEventListener("click", onExitClick);

(function () {
  fetchWeatherData();
  fetchRateData();
})();
