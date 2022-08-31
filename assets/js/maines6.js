class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UserInterface {
  addBooktoList(book) {
    const list = document.getElementById('bookList');

    // Create list
    list.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${book.title} - ${book.author}</div>
        <span>${book.isbn}</span>
      </div>
      <span class="text-danger">
        <i class="fa-solid fa-trash-can deleteBtn"></i>
      </span>
    </li>
  `;
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert alert-${className}`;
    // Add textNode
    div.appendChild(document.createTextNode(message));

    // Get div messages and append
    const messagesDiv = document.querySelector('.messages');
    messagesDiv.appendChild(div);

    // Timout afeter 3 seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.classList.contains('deleteBtn')) {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookIsbn').value = '';
  }
}

// Localstorage Class
class Store {
  // A palavra chave static define um método estático para a classe.
  // Métodos estáticos não são chamados na instâncias da classe.
  // Em vez disso, eles são chamados na própria classe.
  // Geralmente, são funções utilitárias, como funções para criar ou clonar objetos.
  static getBooks() {
    let books;

    // if (localStorage.getItem('books') === null) {
    //   books = [];
    // } else {
    //   books = JSON.parse(localStorage.getItem('books'));
    // }

    return (books = [] ?? JSON.parse(localStorage.getItem('books')));
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const userInterface = new UserInterface();
      userInterface.addBooktoList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listener to Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('bookTitle').value,
    author = document.getElementById('bookAuthor').value,
    isbn = document.getElementById('bookIsbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const userInterface = new UserInterface();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    userInterface.showAlert('Fields required!', 'danger');
  } else {
    // Add book to list
    userInterface.addBooktoList(book);
    // Add to Localstorage
    Store.addBook(book);
    // Show success
    userInterface.showAlert('Book saved!', 'success');
    // Clear fileds
    userInterface.clearFields();
  }

  e.preventDefault();
});

// Event listener to Delete Book
document.getElementById('bookList').addEventListener('click', function (e) {
  // Instantiate UI
  const userInterface = new UserInterface();
  // Delete book
  userInterface.deleteBook(e.target);
  // Remove form LocalStorage
  Store.removeBook(
    e.target.parentElement.previousElementSibling.children[1].textContent
  );
  // Deete Success
  userInterface.showAlert('Book removed!', 'success');

  e.preventDefault();
});
