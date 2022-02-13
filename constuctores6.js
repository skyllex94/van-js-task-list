class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        // Create a tr element 
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }

    showAlert(msg, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        // Add Text
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div, form);
        // Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store {

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(current){
            const ui = new UI;
            ui.addBookToList(current);
        })
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(current, index){
            if(current.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

document.getElementById('book-form').addEventListener('submit', function(e){
    // Take Input Fields
    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const isbnInput = document.getElementById('isbn').value;

    // Instantiate a Book
    const book = new Book(titleInput, authorInput, isbnInput);

    const ui = new UI();

    //Validate 
    if(titleInput === '' || authorInput === '' || isbnInput === ''){
        ui.showAlert('Please fill-in all fields!', 'error');
    } else {
        ui.addBookToList(book);
        // Add to local Storage
        Store.addBook(book);
        // Show Alert
        ui.showAlert('Book Added!', 'success');

        console.log(ui);
    
        // Clear Fields
        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed', 'success');

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    e.preventDefault();
});