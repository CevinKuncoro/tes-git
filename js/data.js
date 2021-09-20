const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return false;
}

function updateDataToStorage() { //updatejson
    if(isStorageExist()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() { //fetchjson
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(data !== null) {
        books=data;
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

function composeBookObject(id, title, author, year, isComplete) {
    return {
        id: +new Date(), title, author, year, isComplete
    };
}

function renderFromBooks() { //refreshDataFromBook
    for(book of books) {
        const newBook = createBook(book.id, book.title, book.author, book.year, book.isComplete);

        if(book.isComplete) {
            document.getElementById(COMPLETE_BOOK).append(newBook);
        } else {
            document.getElementById(INCOMPLETE_BOOK).append(newBook);
        }
    }
}

function deleteDataFromStorage(idBook) { //deleteBookFromJson
    for(let arrayPosition = 0; arrayPosition < books.lenght; arrayPosition++) {
        if(books[arrayPosition].id == idBook) {
            book.splice(arrayPosition, 1);
            break;
        }
    }  
}

function findBook(todoId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
 }

 function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.idBook === bookId)
            return index;
  
        index++;
    }
  
    return -1;
 }

 /*function refreshDataFromBook() {
    const listUncompleted = document.getElementById(INCOMPLETE_BOOK);
    let listCompleted = document.getElementById(COMPLETE_BOOK);
  
  
    for(book of books){
        const newBook = createBook(book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ITEMID] = book.idBook;
  
  
        if(book.isComplete){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }*/