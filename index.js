const newNote = document.getElementById("new-note");
const formEl = document.getElementById("form-el");
const buttonEl = document.getElementById("button-el");
const viewEl = document.getElementById("view-el");
const inputEl = document.getElementById("input-el");
const textAreaEl = document.getElementById("textArea-el");
const nameRenderEl = document.getElementById("render-name");
const bodyRenderEl = document.getElementById("render-body");
const editBtn = document.getElementById("edit-btn");
const editEl = document.getElementById("edit-el");
const editBodyEl = document.getElementById("edit-body-el");
const editNameEl = document.getElementById("edit-name-el");
//This is help object to store values of input and textarea
let noteObject = {
  name: " ",
  body: " ",
};
//This function shows form on page
newNote.addEventListener("click", function () {
  formEl.className = "visible";
  nameRenderEl.innerHTML = "";
  bodyRenderEl.innerHTML = "";
});
//This part of code checks for input errors
let error;
buttonEl.addEventListener("click", function () {
  if (inputEl.value === "" || textAreaEl.value === "") {
    alert("You can't add empty note!");
    error = 0;
    return error;
  } else {
    alert("Note has successfuly been saved");
    error = 1;
    return error;
  }
});
viewEl.addEventListener("click", function () {
  let myNotes = JSON.parse(localStorage.getItem("notes"));
  if (myNotes === null || myNotess.length === 0) {
    alert("You don't have saved notes!");
  } else {
    renderSavedNotesName();
    formEl.className = "invisible";
  }
});
//saveNote function saves information about notes in local storage
function saveNote() {
  if (error) {
    let myNotes = JSON.parse(localStorage.getItem("notes")) || [];
    noteObject.name = inputEl.value;
    noteObject.body = textAreaEl.value;
    myNotes.push(noteObject);
    localStorage.setItem("notes", JSON.stringify(myNotes));
    inputEl.value = "";
    textAreaEl.value = "";
  }
}
buttonEl.addEventListener("click", saveNote);
//renderSavedNotesName function gets notes from local storage and renders names on page
function renderSavedNotesName() {
  let listNames = " ";
  let myNotes = JSON.parse(localStorage.getItem("notes"));
  for (let i = 0; i < myNotes.length; i++) {
    listNames += `
      <li onclick="renderNoteBody()">
      ${myNotes[i].name}
      </li>
      
    `;
  }
  nameRenderEl.innerHTML = listNames;
}
//This part of code listens for click on note name and stores value in requstedNote for later use
let requestedNote;
document.onclick = function (evt) {
  let evt = window.event || evt;
  if (!evt.target) evt.target = evt.srcElement;
  requestedNote = evt.target.innerText;
  return requestedNote;
};
//Function renderNoteBody renders note body on page
function renderNoteBody() {
  let listBody = "";
  let myNotes = JSON.parse(localStorage.getItem("notes"));
  for (let i = 0; i < myNotes.length; i++) {
    if (requestedNote === myNotes[i].name) {
      listBody += `
      <li>
        ${myNotes[i].body}
      </li>
      <button class="button m-2" onclick="deleteNote()">Delete Note</button>
      <button class="button m-2" onclick="editNoteForm()">Edit Note</button>
    `;
      noteObject.name = myNotes[i].name;
      noteObject.body = myNotes[i].body;
    }
  }
  bodyRenderEl.innerHTML = listBody;
}
//updateNotes updates local storage
function updateNotes(myNotes) {
  localStorage.clear();
  localStorage.setItem("notes", JSON.stringify(myNotes));
}
//deleteNote function deletes specified note from myNotes object and updates local storage with new value
function deleteNote() {
  let myNotes = JSON.parse(localStorage.getItem("notes"));
  let savedIndex;
  for (let i = 0; i < myNotes.length; i++) {
    if (myNotes[i].body === noteObject.body) {
      savedIndex = i;
    }
  }
  myNotes.splice(savedIndex, 1);
  updateNotes(myNotes);
  renderNoteBody();
  renderSavedNotesName();
}
//editNoteForm shows form for edditing current note
function editNoteForm() {
  if (bodyRenderEl.className === "visible") {
    bodyRenderEl.className = "d-none";
  }
  editEl.className = "d-inline";
  editNameEl.value = noteObject.name;
  editBodyEl.value = noteObject.body;
}
//by clicking on edit button it triggers function which edits current active note and stores it in local storage
editBtn.addEventListener("click", function () {
  bodyRenderEl.className = "visible";
  editEl.className = "d-none";
  let myNotes = JSON.parse(localStorage.getItem("notes"));
  let savedIndex;
  for (let i = 0; i < myNotes.length; i++) {
    if (myNotes[i].name === noteObject.name) {
      myNotes[i].body = editBodyEl.value;
      savedIndex = i;
      myNotes[i].name = editNameEl.value;
    }
  }
  requestedNote = myNotes[savedIndex].name;
  updateNotes(myNotes);
  renderNoteBody();
  renderSavedNotesName();
});
