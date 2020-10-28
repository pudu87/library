let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
    let readInfo = this.read === true ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readInfo}.`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  const table = document.querySelector('table');
  const tr = document.createElement('tr');
  tr.className = `book-${myLibrary.length-1}`;
  console.log(Object.keys(book));
  Object.keys(book).forEach(item => {
    const td = document.createElement('td');
    if (item == "read") {
      td.textContent = book[item] === true ? "Yes" : "No";
      const btn = document.createElement('button');
      btn.textContent = "change";
      td.appendChild(btn);
    } else {
      td.textContent = book[item];
    }
    tr.appendChild(td);
  })
  const td = document.createElement('td');
  const btn = document.createElement('button');
  btn.textContent = "X";
  td.appendChild(btn);
  tr.appendChild(td);
  table.appendChild(tr);
}

const newBookBtn = document.querySelector('.new-book button');
newBookBtn.addEventListener('click', () => {
  const newBookForm = document.querySelector('.new-book form');
  newBookForm.hidden ? newBookForm.hidden = false : newBookForm.hidden = true;
})

let input = [];
function submitForm() {
  input = [];
  let result;
  result = document.querySelectorAll('.new-book input');
  result.forEach(item => {
    if (item.type === "checkbox") {
      item.checked ? input.push(true) : input.push(false);
    } else {
      input.push(item.value);
    }
  })
  input.pop();
  input[2] = parseInt(input[2]);
  let book = new Book(...input);
  addBookToLibrary(book);
  return false;
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 309, true);
addBookToLibrary(theHobbit);
console.log(theHobbit)
console.log(theHobbit.info());

let theGodDelusion = new Book("The God Delusion", "Richard Dawkins", 463, false);
addBookToLibrary(theGodDelusion);
