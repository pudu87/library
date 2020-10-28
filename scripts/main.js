let myLibrary = [];

const items = ["title", "author", "pages", "read"];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = function() {
  //   let readInfo = read === true ? "already read" : "not read yet";
  //   return `${title} by ${author}, ${pages} pages, ${readInfo}.`;
  // };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showBooks() {
  const table = document.querySelector('table');
  myLibrary.forEach(book => {
    const tr = document.createElement('tr');
    for (let item in book) {
      console.log(book[item]);
      const td = document.createElement('td');
      if (item == "read") {
        td.textContent = book[item] === true ? "Yes" : "No";
        // read
        const btn = document.createElement('button');
        btn.textContent = "change";
        td.appendChild(btn);
        // 
      } else {
        td.textContent = book[item];
      }
      tr.appendChild(td);
    }
    // delete
    const td = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = "X";
    td.appendChild(btn);
    tr.appendChild(td);
    //
    table.appendChild(tr);
  })
}

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', () => {
  const newBookForm = document.querySelector('#new-book-form');
  newBookForm.hidden ? newBookForm.hidden = false : newBookForm.hidden = true;
})

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 309, true);
addBookToLibrary(theHobbit);
let theGodDelusion = new Book("The God Delusion", "Richard Dawkins", 463, false);
addBookToLibrary(theGodDelusion);

showBooks();
