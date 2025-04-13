
const myURL = "D:\to_do_listcards-data";

let idNum = -1;
let editId;
let deleteId;

const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const rate = document.getElementById("rate");

let cardsLi = document.querySelectorAll(".to-do-list-li")
const idList = document.getElementsByClassName("id-card-value");
const cardsListUl = document.getElementById("cards-list-ul");
const editButton = document.getElementById("edit-button");
const addButton = document.getElementById("add-button");

const selectList = document.getElementById("select-element");

const sortButton = document.getElementById("sort-button");
const filterButton = document.getElementById("filter-button");
const showAllButton = document.getElementById("show-all");

const statusCheckbox = document.getElementById("status-checkbox");
const dateCheckbox = document.getElementById("date-checkbox");
const deadlineCheckbox = document.getElementById("deadline-checkbox");

const statusFilterText = document.getElementById("get-status-for-filter");
const dateFilterText = document.getElementById("get-date-for-filter");
const deadlineFilterText = document.getElementById("get-deadline-for-filter");

const errorText = document.getElementById("error-text");

const confirmYesButton = document.getElementById("confirm-yes-button");
const confirmExitButton = document.getElementById("confirm-exit-button");

const saveAddButton = document.getElementById("add-task-save-button");
const saveEditButton = document.getElementById("edit-task-save-button")
const errorExitButton = document.getElementById("error-exit-button")

const exitButtons = document.getElementsByClassName("task-exit");
const editButtons = document.getElementsByClassName("task-edit");

const dialogAddWindow = document.getElementById("add-task-dialog");
const dialogEditWindow = document.getElementById("edit-task-dialog");
const errorsWindow = document.getElementById("errors-notification")
const confirmWindow = document.getElementById("confirm-of-delete");

const inputTitle = document.getElementById("get-task-title");
const inputDesc = document.getElementById("get-task-description");
const inputDeadline = document.getElementById("get-task-deadline");
const inputTags = document.getElementById("get-task-tags");
const inputStatus = document.getElementById("get-task-status");

const editTitle = document.getElementById("edit-task-title");
const editDesc = document.getElementById("edit-task-description");
const editDeadline = document.getElementById("edit-task-deadline");
const editTags = document.getElementById("edit-task-tags");
const editStatus = document.getElementById("edit-task-status");

const titles = document.getElementsByClassName("task-title");

function addFunc(element, fn) {
  element.addEventListener("click", fn);
}

function tagConversion(str) {
  const elements = str.trim().split(",");
  return elements.map(element => (element = "#" + element.trim())).join(", ");
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

function deleteCard()
  {
    for(let i = 0; i < idList.length; i++)
    {
      if(Number(idList[i].textContent) === deleteId)
      {
        idList[i].parentElement.parentElement.remove();
      }
    }
    confirmWindow.close();
    MyCards.cardsList.splice(0, MyCards.cardsList.length); 
    let cardsArr = [];
    let notUpdatedCardsArr = JSON.parse(localStorage.getItem("cards"));
    for (let i = 0; i < notUpdatedCardsArr.length; i++) {
      let {
        id: idValue,
        title: titleValue,
        description: descValue,
        deadline: deadlineValue,
        tags: tagsValue,
        status: statusValue,
        createdAt: createdAtValue,
        updatedAt: updatedAtValue,
        history: historyArr,
      } = notUpdatedCardsArr[i];
      if(idValue != deleteId)
      {
        cardsArr.push({id: idValue,
          title: titleValue,
          description: descValue,
          deadline: deadlineValue,
          tags: tagsValue,
          status: statusValue,
          createdAt: createdAtValue,
          updatedAt: updatedAtValue,
          history: historyArr
        })
        MyCards.addData(idValue, titleValue, descValue, deadlineValue, tagsValue, statusValue, createdAtValue, updatedAtValue);
      }
    }
    localStorage.setItem(
      "cards",
      JSON.stringify(cardsArr));
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

  submitAddedData() {
    let cardsArr = [];
    for(let i = 0; i < this.cardsList.length; i++)
    {
      cardsArr.push({id: this.cardsList[i].id,
        title: this.cardsList[i].title,
        description: this.cardsList[i].description,
        deadline: this.cardsList[i].deadline,
        tags: this.cardsList[i].tags,
        status: this.cardsList[i].status,
        createdAt: this.cardsList[i].createdAt,
        updatedAt: this.cardsList[i].updatedAt,
        history: 
        [{
          action: this.cardsList[i].action,
          timestamp: this.cardsList[i].timestamp
        }]
      })
    }
    localStorage.setItem(
      "cards",
      JSON.stringify(cardsArr));
    /* for (let i = 0; i < JSON.parse(localStorage.getItem("cards")).length; i++) {
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
    } */
    
  }

  renderSumbittedAddedData() {
    let {
      id: idValue,
      title: titleValue,
      description: descValue,
      deadline: deadlineValue,
      tags: tagsValue,
      status: statusValue,
    } = JSON.parse(localStorage.getItem("cards"))[
      JSON.parse(localStorage.getItem("cards")).length - 1
    ];

    const cardsListLi = document.createElement("li");

    const cardId = document.createElement("p");
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

    cardId.classList.add("id-card-value");
    cardsListLi.classList.add("to-do-list-li");
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

    cardId.textContent = idValue;
    cardTitle.textContent = titleValue;
    cardDesc.textContent = descValue;
    cardTagText.textContent = tagConversion(tagsValue);
    cardStatusText.textContent = statusValue;
    cardDeadline.textContent = deadlineValue;

    cardEditButton.addEventListener("click", function()
    {
      dialogEditWindow.showModal();
      editTitle.value = titleValue;
      editDesc.value = descValue;
      editTags.value = tagsValue;
      editStatus.value = statusValue;
      editDeadline.value = deadlineValue;
      editId = idValue;
    });

    cardDeleteButton.addEventListener("click", function()
    {
      deleteId = idValue;
      confirmAction();
    });

    cardsListUl.append(cardsListLi);
    cardsListLi.append(cardDiv);
    cardDiv.append(cardId);
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

  editData(id,
    title,
    description,
    deadline,
    tags,
    status,
    updatedAt,
    action,
    timestamp)
  {
    for(let i = 0; i < this.cardsList.length; i++)
    {
      if(id === this.cardsList[i].id)
      {
        this.cardsList[i].title = title;
      this.cardsList[i].description = description;
      this.cardsList[i].deadline = deadline;
      this.cardsList[i].tags = tags;
      this.cardsList[i].status = status;
      this.cardsList[i].updatedAt = updatedAt;
      this.cardsList[i].action = action;
      this.cardsList[i].timestamp = timestamp;
      }
    }
  }

  submitEditedData(id)
  {
    const cardsArr = [];
    for(let i = 0; i < this.cardsList.length; i++)
    {
      if(i == id)
      {
        let {history: historyArrValue} = JSON.parse(localStorage.getItem("cards"))[i];
        let historyArr = historyArrValue;
        historyArr.push({action: this.cardsList[i].action, timestamp: this.cardsList[i].timestamp});
        cardsArr.push({id: this.cardsList[i].id,
          title: this.cardsList[i].title,
          description: this.cardsList[i].description,
          deadline: this.cardsList[i].deadline,
          tags: this.cardsList[i].tags,
          status: this.cardsList[i].status,
          createdAt: this.cardsList[i].createdAt,
          updatedAt: this.cardsList[i].updatedAt,
          history: historyArr
        })
      }
      else
      {
        let {history: historyArrValue} = JSON.parse(localStorage.getItem("cards"))[i];
        cardsArr.push({id: this.cardsList[i].id,
          title: this.cardsList[i].title,
          description: this.cardsList[i].description,
          deadline: this.cardsList[i].deadline,
          tags: this.cardsList[i].tags,
          status: this.cardsList[i].status,
          createdAt: this.cardsList[i].createdAt,
          updatedAt: this.cardsList[i].updatedAt,
          history: historyArrValue
        })
      }  
    }
    localStorage.removeItem("cards");
    localStorage.setItem("cards",JSON.stringify(cardsArr));
  }

  renderSubmittedEditedData(id)
  {
    let cardIndex;
    let realId;
    let unUpdatedList = JSON.parse(localStorage.getItem("cards"));
    for(let i = 0; i < unUpdatedList.length; i++)
    {
      let{id: idOfCard} = JSON.parse(localStorage.getItem("cards"))[i];
      if(idOfCard === id)
      {
        realId = i;
      }
    }
    let {
      id: idValue,
      title: titleValue,
      description: descValue,
      deadline: deadlineValue,
      tags: tagsValue,
      status: statusValue
    } = JSON.parse(localStorage.getItem("cards"))[realId];

    for(let i = 0; i < idList.length; i++)
    {
      if(Number(idList[i].textContent) === id)
      {
        cardIndex = i;
      }
    }

    const cardTitle = document.getElementsByClassName("task-title")[cardIndex];
    const cardDesc = document.getElementsByClassName("task-desc")[cardIndex];
    const cardTagText = document.getElementsByClassName("task-tag-text")[cardIndex];
    const cardStatusText = document.getElementsByClassName("task-status")[cardIndex];
    const cardDeadline = document.getElementsByClassName("task-deadline")[cardIndex];

    cardTitle.textContent = titleValue;
    cardDesc.textContent = descValue;
    cardTagText.textContent = tagConversion(tagsValue);
    cardStatusText.textContent = statusValue;
    cardDeadline.textContent = deadlineValue;

    cardTitle.classList.add("task-title");
    cardDesc.classList.add("task-desc");
    cardTagText.classList.add("task-tag-text");
    cardStatusText.classList.add("task-status-text");
    cardDeadline.classList.add("task-deadline");
  }
}

let MyCards = new Cards();

function getNowTime() {
  let date = new Date();
  return String(date.toISOString().slice(0, 10));
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

function checkValidation(condition)
{
  if(condition == "FOR_ADD")
  {
    if(inputTitle.value.trim().length != 0 && inputDesc.value.trim().length != 0 && inputDeadline.value.trim().length != 0 && inputTags.value.trim().length != 0 && inputStatus.value.trim().length !=0)
    {
      if(/^\d{4}-\d{2}-\d{2}$/.test(inputDeadline.value))
      {
        const [year, month, day] = inputDeadline.value.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        if(date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day)
        {   
          for(let i = 0; i < MyCards.cardsList.length; i++)
          {
            for(let j = 0; j < MyCards.cardsList[i].tags.trim().split(",").length; j++)
            {
              if (inputTags.value.trim().split(",").includes(MyCards.cardsList[i].tags.trim().split(",")[j]))
              {
                return "TAG_ERROR";
              }
            }
          }
          return true;
        }
        else
        {
          return "DEADLINE_ERROR";
        }
      }
      else
      {
        return "DEADLINE_ERROR";
      }
    }
    else
    {
    return "NULL_ERROR";
    }
  }
  else if (condition == "FOR_EDIT")
  {
    if(editTitle.value.trim().length != 0 && editDesc.value.trim().length != 0 && editDeadline.value.trim().length != 0 && editTags.value.trim().length != 0 && editStatus.value.trim().length !=0)
    {
      if(/^\d{4}-\d{2}-\d{2}$/.test(editDeadline.value))
      {
        const [year, month, day] = editDeadline.value.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        if(date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day)
        {   
          for(let i = 0; i < MyCards.cardsList.length; i++)
          {
            for(let j = 0; j < MyCards.cardsList[i].tags.trim().split(",").length; j++)
            {
              if (editTags.value.trim().split(",").includes(MyCards.cardsList[i].tags.trim().split(",")[j]) && MyCards.cardsList[i].id != editId)
              {
                return "TAG_ERROR";
              }
            }
          }
          return true;
        }
        else
        {
          return "DEADLINE_ERROR";
        }
      }
      else
      {
        return "DEADLINE_ERROR";
      }
    }
    else
    {
      return "NULL_ERROR";
    }  
  }
}

function confirmAction()
{
  confirmWindow.showModal();
  console.log("deleteID: " + deleteId);
}

function onSaveAddClick() {
  
  if(checkValidation("FOR_ADD") === true)
  {
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
    MyCards.submitAddedData();
    MyCards.renderSumbittedAddedData();
    dialogAddWindow.close();
  }
  else if(checkValidation("FOR_ADD") === "NULL_ERROR"){
    errorText.textContent = "Все пункты задачи не должны быть пустыми";
    errorsWindow.showModal();
  }
  else if(checkValidation("FOR_ADD") === "DEADLINE_ERROR")
  {
    errorText.textContent = "Неверный формат деадлайна";
    errorsWindow.showModal();
  }
  else if(checkValidation("FOR_ADD") === "TAG_ERROR")
  {
    errorText.textContent = "Данный тег уже существует";
    errorsWindow.showModal();
  }
}

function onSaveEditClick()
{
  if(checkValidation("FOR_EDIT") === true)
  {
    MyCards.editData(
      editId,
      editTitle.value,
      editDesc.value,
      editDeadline.value,
      editTags.value,
      editStatus.value,
      getNowTime(),
      "updated",
      getNowTime()
    );

    MyCards.submitEditedData(editId);
    MyCards.renderSubmittedEditedData(editId);
    dialogEditWindow.close();
  }
  else if(checkValidation("FOR_EDIT") === "NULL_ERROR"){
    errorText.textContent = "Все пункты задачи не должны быть пустыми";
    errorsWindow.showModal();
  }
  else if(checkValidation("FOR_EDIT") === "DEADLINE_ERROR")
  {
    errorText.textContent = "Неверный формат деадлайна";
    errorsWindow.showModal();
  }
  else if(checkValidation("FOR_EDIT") === "TAG_ERROR")
  {
    errorText.textContent = "Данный тег уже существует";
    errorsWindow.showModal();
  }
}

function onEditClick()
{
  dialogEditWindow.showModal();
}

function onExitClick() {
  dialogAddWindow.close();
  dialogEditWindow.close();
}

function renderSortedCards(sortedArr)
{
  for(let i = 0; i < sortedArr.length; i++)
  {
    let {
      id: idValue,
      title: titleValue,
      description: descValue,
      deadline: deadlineValue,
      tags: tagsValue,
      status: statusValue,
    } = sortedArr[i];
  
    const cardsListLi = document.createElement("li");
  
    const cardId = document.createElement("p");
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
  
    cardId.classList.add("id-card-value");
    cardsListLi.classList.add("to-do-list-li");
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
  
    cardId.textContent = idValue;
    cardTitle.textContent = titleValue;
    cardDesc.textContent = descValue;
    cardTagText.textContent = tagConversion(tagsValue);
    cardStatusText.textContent = statusValue;
    cardDeadline.textContent = deadlineValue;
  
    cardEditButton.addEventListener("click", function()
    {
      dialogEditWindow.showModal();
      editTitle.value = titleValue;
      editDesc.value = descValue;
      editTags.value = tagsValue;
      editStatus.value = statusValue;
      editDeadline.value = deadlineValue;
      editId = idValue;
    });
  
    cardDeleteButton.addEventListener("click", function()
    {
      deleteId = idValue;
      confirmAction();
    });
  
    cardsListUl.append(cardsListLi);
    cardsListLi.append(cardDiv);
    cardDiv.append(cardId);
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

function alphabetSort()
{
  let sortedArr = [];
  let unsortedArr = JSON.parse(localStorage.getItem("cards"));

  sortedArr = unsortedArr.sort((a, b) => {
    if (a.title.trim().toLowerCase() < b.title.trim().toLowerCase()) {
      return -1;
    }
    if (a.title.trim().toLowerCase() > b.title.trim().toLowerCase()) {
      return 1;
    }
    return 0;
  })

  renderSortedCards(sortedArr);
}

function statusSort()
{
  let sortedArr = [];
  let unsortedArr = JSON.parse(localStorage.getItem("cards"));

  sortedArr = unsortedArr.sort((a, b) => 
  {
    if(a.status === "Выполнено")
    {
      return -1;
    }
    if(b.status === "Выполнено")
    {
      return 1;
    }
  })

  renderSortedCards(sortedArr);  
}

function dateOfCreationSort()
{
  let sortedArr = [];
  let unsortedArr = JSON.parse(localStorage.getItem("cards"));

  sortedArr = unsortedArr.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  })
  
  renderSortedCards(sortedArr);
}

function onSortClick()
{
  cardsListUl.innerHTML = '';
  if(selectList.value === "ALPHABET")
  {
    alphabetSort();
  }
  else if(selectList.value === "STATUS")
  {
    statusSort();
  } 
  else if(selectList.value === "DATE_OF_CREATION")
  {
    dateOfCreationSort();
  }
}

function filterCards(filterArr, status, date, deadline)
{
  let sortedArr = JSON.parse(localStorage.getItem("cards"));

  for(let i = 0; i < filterArr.length; i++)
  {
    if(filterArr[i] === "STATUS")
    {
      sortedArr = sortedArr.filter(item => item.status === status)
      console.log(status);
    }
    if(filterArr[i] === "DATE")
    {
      sortedArr = sortedArr.filter(item => item.createdAt === date)
    }
    if(filterArr[i] === "DEADLINE")
    {
      sortedArr = sortedArr.filter(item => item.deadline === deadline)
    }
  }
  console.log(sortedArr);



  return sortedArr;

  /* if(type === "STATUS")
  {
    for(let i = 0; i < unsortedArr.length; i++)
    {
      if(unsortedArr[i].status === text)
      {
        sortedArr.push(unsortedArr[i]);
      }
    }
    return sortedArr;
  }

  if(type === "DATE")
  {
    for(let i = 0; i < unsortedArr.length; i++)
    {
      console.log(unsortedArr[i].createdAt);
      if(unsortedArr[i].createdAt === text)
      {
        sortedArr.push(unsortedArr[i]);
      }
    }
    return sortedArr;
  } */

}

function onFilterClick()
{
  let filterArr = [];
  if(statusCheckbox.checked)
  {
    filterArr.push("STATUS");
  }
  if(dateCheckbox.checked)
  {
    filterArr.push("DATE");
  }
  if(deadlineCheckbox.checked)
  {
    filterArr.push("DEADLINE")
  }

  cardsListUl.innerHTML = '';
  renderSortedCards(filterCards(filterArr, statusFilterText.value, dateFilterText.value, deadlineFilterText.value));
}

const showAllCards = () =>
{
  let unsortedArr = JSON.parse(localStorage.getItem("cards"));
  cardsListUl.innerHTML = '';
  renderSortedCards(unsortedArr);
}

saveAddButton.addEventListener("click", onSaveAddClick);
saveEditButton.addEventListener("click", onSaveEditClick);
addButton.addEventListener("click", onAddClick);
errorExitButton.addEventListener("click", () => errorsWindow.close());
confirmYesButton.addEventListener("click", () => deleteCard());
confirmExitButton.addEventListener("click", () => confirmWindow.close());

showAllButton.addEventListener("click", showAllCards);

sortButton.addEventListener("click", onSortClick);
filterButton.addEventListener("click", onFilterClick);

Array.prototype.forEach.call(exitButtons, function(element) 
{
  element.addEventListener("click", onExitClick);
});

(function () {
  fetchWeatherData();
  fetchRateData();
})();
