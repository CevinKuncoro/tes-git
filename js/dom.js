const INCOMPLETE_BOOK = "incompleteBookshelfList";
const COMPLETE_BOOK = "completeBookshelfList";

function addBook() {
    const idBook = +new Date();
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = createBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    const bookObject = composeBookObject(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

    books.push(bookObject);

    if(inputBookIsComplete) {
        document.getElementById(COMPLETE_BOOK).append(book);
    } else {
        document.getElementById(INCOMPLETE_BOOK).append(book);
    }

    updateDataToStorage();
}

function createBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete){
    const book = document.createElement("article");
    book.setAttribute("id", idBook);
    
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = inputBookTitle;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = inputBookAuthor;

    const bookYear = document.createElement("p");
    bookYear.innerText = inputBookYear;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const actionButton = addAction(inputBookIsComplete, idBook);

    textContainer.append(actionButton);
    book.append(textContainer);
    /*if(inputBookIsComplete){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton()
        );
    }*/
    return book;
}

function addAction(inputBookIsComplete, idBook){
    const buttonAction = document.createElement("div");

    const actionDelete = createActionDelete(idBook);
    const actionRead = createActionRead(idBook);
    const actionUndo = createActionUndo(idBook);

    buttonAction.append(actionDelete);

    if(inputBookIsComplete){
        buttonAction.append(actionUndo);
    } else {
        buttonAction.append(actionRead);
    }
    return buttonAction;
}

function createActionDelete(idBook){
    const actionDelete = document.createElement("button");
    actionDelete.classList.add("btn", "btn-sm", "btn-outline-danger", "mx-1");
    actionDelete.innerHTML = '<i class="bi bi-x"></i>';

    actionDelete.addEventListener("click", function() {
        let confirmation = confirm ("apakah anda yakin menghapus buku?");

        if(confirmation){
            const textParent = document.getElementById(idBook);
            textParent.addEventListener("eventDelete", function(event){
                event.target.remove();
            });
            textParent.dispatchEvent(new Event("eventDelete"));

            deleteDataFromStorage(idBook);
            updateDataToStorage();
        }
    });
    return actionDelete;
}


function createActionRead(idBook){
    const action = document.createElement("button");
    action.classList.add("btn");

    action.addEventListener("click", function(){
        const textParent = document.getElementById(idBook);

        const bookTitle = textParent.querySelector(".container > h5").innerText;
        const bookAuthor = textParent.querySelector(".container > p")[0].innerText;
        const bookYear = textParent.querySelector(".container > p")[1].innerText;

        textParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(COMPLETE_BOOK).append(book);

        deleteDataFromStorage(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, true);

        books.push(bookObject);
        updateDataToStorage()
    })
    return action;
}

function createActionUndo(idBook){
    const action = document.createElement("button");
    action.classList.add("btn");

    action.addEventListener("click", function(){
        const textParent = document.getElementById(idBook);

        const bookTitle = textParent.querySelector(".container > h5").innerText;
        const bookAuthor = textParent.querySelector(".container > p")[0].innerText;
        const bookYear = textParent.querySelector(".container > p")[1].innerText;

        textParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(INCOMPLETE_BOOK).append(book);

        deleteDataFromStorage(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, false);

        books.push(bookObject);
        updateDataToStorage();
    })
    return action;
}


/*function createButton(buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function createUndoButton(){
    return createButton("undo-button", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
        addTaskToCompleted(event.target.parentElement);
    });
}

function addBookToCompleted(taskElement){
    const listCompleted = document.getElementById(COMPLETE_BOOK);
    const bookTitle = taskElement.querySelector(".inner > h3").innerText;
    const bookAuthor = taskElement.querySelector(".inner > p").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.inputBookIsComplete = true;
    newBook[BOOK_ITEMID] = book.idBook;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(taskElement) {
    const bookPosition = findBookIndexIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    
    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(taskElement){
    const listUncompleted = document.getElementById(INCOMPLETE_BOOK);
    const bookTitle = taskElement.querySelector(".inner > h3").innerText;
    const bookAuthor = taskElement.querySelector(".inner > p").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.inputBookIsComplete = false;
    newBook[BOOK_ITEMID] = book.idBook;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}*/