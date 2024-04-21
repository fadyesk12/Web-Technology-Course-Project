var list = JSON.parse(localStorage.getItem("books"))  || [];
console.log(list);
document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    var searchType = "T";
    if(document.getElementById("bookID").checked){
        searchType = "I";
    }
    else if(document.getElementById("bookCategory").checked){
        searchType = "C";
    }
    window.location.href = "./book_list.html?" + document.getElementById("searchText").value + searchType;
})
var query = window.location.search;
var queryType = query.slice(-1);
var queryText = query.substring(1,query.length-1);
queryText = queryText.replace(/%20/g, " ");
console.log(queryText);
if(list.length < 1){
    var message = document.createElement("p");
    message.innerHTML = "No books are currently in the library please add books using the button below.";
    var div = document.getElementById("AddBookLink");
    div.insertBefore(message,div.firstChild);
}
else{
    var found = (query)? false:true;
    list.forEach(book => {
        if(queryType == "T"){
            if(book.bookName.toLowerCase() == queryText.toLowerCase()){
                found = true;
            }
        }
        else if(queryType == "I"){
            if(book.bookID == queryText){
                found = true;
            }
        }
        else if(queryType == "C"){
            if(book.category.toLowerCase() == queryText.toLowerCase()){
                found = true;
            }
        }
        if(found){
            const newBook = document.createElement("div");
            newBook.className = "book";
            var bookLink = document.createElement("a");
            bookLink.href = "BookDisplay.html?" + book.bookID;
            var coverImage = document.createElement("img");
            coverImage.src = localStorage.getItem(book.imgData);
            coverImage.alt = "Book Cover"
            bookLink.appendChild(coverImage);
            newBook.appendChild(bookLink);
            
            var bookInfo = document.createElement("div");
            bookInfo.className = "book-info";
            var bookInfoLink = document.createElement("a");
            bookInfoLink.href = "BookDisplay.html?" + book.bookID;
            var bookTitle = document.createElement("h2");
            bookTitle.className = "book-title"
            bookTitle.innerHTML = book.bookName;
            var bookAuthor = document.createElement("p");
            bookAuthor.className = "book-author";
            bookAuthor.innerHTML = book.author;
            bookInfoLink.appendChild(bookTitle);
            bookInfoLink.appendChild(bookAuthor);
            bookInfo.appendChild(bookInfoLink);
            newBook.appendChild(bookInfo);

            document.getElementById("bookList").appendChild(newBook);
            found = (query)?false:true;
        }
    })
}