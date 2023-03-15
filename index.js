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
let noteObject = {
  name: " ",
  body: " ",
};

newNote.addEventListener("click", function () {
  formEl.className = "visible";
  nameRenderEl.innerHTML = "";
  bodyRenderEl.innerHTML = "";
});
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
  console.log("klik");
  let myNotes = JSON.parse(localStorage.getItem("notes"));
  if (myNotes === null || myNotess.length === 0) {
    alert("You don't have saved notes!");
  } else {
    renderSavedNotesName();
    formEl.className = "invisible";
  }
});
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
let requestedNote;
document.onclick = function (evt) {
  var evt = window.event || evt; // window.event for IE
  if (!evt.target) evt.target = evt.srcElement; // extend target property for IE
  requestedNote = evt.target.innerText; // target is clicked
  return requestedNote;
};

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
function updateNotes(myNotes) {
  localStorage.clear();
  localStorage.setItem("notes", JSON.stringify(myNotes));
}
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
function editNoteForm() {
  if (bodyRenderEl.className === "visible") {
    bodyRenderEl.className = "d-none";
  }
  editEl.className = "d-inline";
  editNameEl.value = noteObject.name;
  editBodyEl.value = noteObject.body;
}
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
