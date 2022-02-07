// Book Constructor 
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

// Add Book to List
UI.prototype.addBookToList = function addBookToList(booky){
    const list = document.getElementById('book-list');
    // Create a tr element 
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${booky.title}</td>
    <td>${booky.author}</td>
    <td>${booky.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);

    // console.log(row);
}

UI.prototype.showAlert = function(msg, className){
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

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


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
        // Show Alert
        ui.showAlert('Book Added!', 'success');

        console.log(ui);
    
        // Clear Fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});