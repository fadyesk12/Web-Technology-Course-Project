var bookList = JSON.parse(localStorage.getItem("books"))  || [];
var introduction = document.getElementById("introduction");
var featured = document.getElementById("featured");
console.log(bookList);
introduction.innerHTML = (bookList.length > 0)?"Take a look at our featured books!":"No books added yet. Sign in as an admin to add a book.";
if(bookList.length == 0){
    var welcoming = document.getElementById("welcoming");
    var anchor = document.createElement("a");
    anchor.href = "./Add_book.html";
    var button = document.createElement("button");
    anchor.appendChild(button);
    welcoming.appendChild(anchor);

}
if(bookList.length > 0){
    for(let i = 0; i < 3; i++){
        var book = bookList[i];
        if(!book){
            break;
        }
        anchor = document.createElement("a");
        anchor.href = "./bookDisplay.html?" + book.bookID;
        bookCover = document.createElement("img");
        bookCover.width = "220";
        bookCover.height = "300";
        bookCover.src = localStorage.getItem(book.imgData);
        anchor.appendChild(bookCover);
        featured.appendChild(anchor);
    }
}