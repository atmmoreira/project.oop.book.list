// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UserInterface() {}

// Prototypes
UserInterface.prototype.addBooktoList = function (book) {
  const list = document.getElementById('bookList');

  // Create list
  list.innerHTML = `
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
};

// Show Alert
UserInterface.prototype.showAlert = function (message, className) {
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
};

// Clear Fields
UserInterface.prototype.clearFields = function () {
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookIsbn').value = '';
};

// Delete Book
UserInterface.prototype.deleteBook = function (target) {
  if (target.classList.contains('deleteBtn')) {
    target.parentElement.parentElement.remove();
  }
};

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
  // Deete Success
  userInterface.showAlert('Book removed!', 'success');

  e.preventDefault();
});
