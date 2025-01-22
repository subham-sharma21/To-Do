const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    try {
      const parsedNotes = JSON.parse(storedNotes);
      parsedNotes.forEach((note) => {
        const inputBox = document.createElement("p");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        inputBox.innerHTML = note.content;
        const img = document.createElement("img");
        img.src = "images/delete.png";
        inputBox.appendChild(img);
        notesContainer.appendChild(inputBox);
      });
    } catch (error) {
      console.error("Error parsing notes:", error);
    }
  }
}

showNotes();

function updateStorage() {
  const notesArray = [];
  notes = document.querySelectorAll(".input-box");
  notes.forEach((note) => {
    const noteObject = {
      content: note.innerHTML,
    };
    notesArray.push(noteObject);
  });
  localStorage.setItem("notes", JSON.stringify(notesArray));
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  notesContainer.appendChild(inputBox);
  inputBox.appendChild(img);
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
