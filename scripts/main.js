let myLibrary = [];

// QUERY'S

const table = document.querySelector("table");
const newBookBtn = document.querySelector(".new-book button");
const newBookForm = document.querySelector(".new-book form");
const newBookInput = document.querySelectorAll(".new-book input");

// CONSTRUCTORS

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype = {
  constructor: Book,
  showInfo: function() {
    let readInfo = this.read === true ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readInfo}.`;
  },
  toggleRead: function() {
    this.read = this.read === true ? false : true;
  }
};

// FUNCTIONS

function submitForm() {
  let input = [];
  newBookInput.forEach(item => {
    if (item.type === "checkbox") {
      item.checked ? input.push(true) : input.push(false);
    } else if (item.type === "number") {
      input.push(parseInt(item.value));
    } else {
      input.push(item.value);
    }
  });
  input.pop();
  let book = new Book(...input);
  addBookToLibrary(book);
  return false;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  let tr = document.createElement("tr");
  tr.className = `book-${myLibrary.length-1}`;
  Object.keys(book).forEach(item => {
    let td = document.createElement("td");
    if (item == "read") {
      createReadCell(book, item, td);
    } else {
      td.textContent = book[item];
    }
    tr.appendChild(td);
  });
  createDeleteCell(tr);
  table.appendChild(tr);
}

function createReadCell(book, item, td) {
  let span = document.createElement("span");
  span.textContent = book[item] === true ? "Yes" : "No";
  td.appendChild(span);
  let btn = document.createElement("button");
  btn.textContent = "change";
  btn.className = "toggle-read";
  btn.setAttribute("onclick", "toggleRead(this)")
  td.appendChild(btn);
}

function createDeleteCell(tr) {
  let td = document.createElement("td");
  let btn = document.createElement("button");
  btn.textContent = "\u00D7";
  btn.className = "delete-book";
  btn.setAttribute("onclick", "deleteRow(this)");
  td.appendChild(btn);
  tr.appendChild(td);
}

function deleteRow(btn) {
  let tr = btn.closest("tr");
  table.removeChild(tr);
}

function toggleRead(btn) {
  // change book instance
  let tr = btn.closest("tr");
  let index = tr.className.split("-")[1];
  myLibrary[index].toggleRead();
  // change table content
  let span = btn.previousSibling;
  span.textContent = myLibrary[index].read === true ? "Yes" : "No";
}

// EVENTS

newBookBtn.addEventListener("click", () => {
  newBookForm.hidden ? newBookForm.hidden = false : newBookForm.hidden = true;
});

// PREPOPULATE

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 309, true);
addBookToLibrary(theHobbit);

let theGodDelusion = new Book("The God Delusion", "Richard Dawkins", 463, false);
addBookToLibrary(theGodDelusion);

let pygmy = new Book("Pygmy", "Chuck Palahniuk", 241, false);
addBookToLibrary(pygmy);
