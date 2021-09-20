document.addEventListener("DOMContentLoaded", function () {

    const formInput = document.getElementById("inputBook");
    const formSearch = document.getElementById("searchBook");

    formInput.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();

        document.getElementById("inputBookTitle").value = "";
        document.getElementById("inputBookAuthor").value = "";
        document.getElementById("inputBookYear").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });

    formSearch.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputSearch = document.getElementById("searchBookTitle").value;
        bookSearch(inputSearch);
    })

    if (isStorageExist()) {
        updateDataToStorage();
    }
});

document.addEventListener("onjsonfetched", function () {
    renderFromBooks();
});
/*document.addEventListener("DOMContentLoaded", function () { //berfungsi sebagai listener yang akan menjalankan kode di dalamnya jika DOM sudah di-load dengan baik

    const submitForm = document.getElementById("form"); //berfungsi untuk mengambil element dengan id “form” yang berada pada file html. Setelah didapatkan, element tersebut kita masukkan ke dalam variable submitForm

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", ()=> {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", ()=> {
    refreshDataFromBook();
});*/