//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
console.log(localStorage.getItem("userID"));
var cookieID = localStorage.getItem("userID");
var loginType;
if(userList){
    userList.forEach(user => {
    if(user.userID == cookieID){
        loginType = user.userType;
    }
    })
}
if(loginType == "admin"){
    var borrowButton = document.createElement("a");
    borrowButton.href = "./borrow.html";
    borrowButton.innerHTML = "Borrow";
    var dashboardButton = document.createElement("a");
    dashboardButton.href = "./auth/dashboard.html";
    dashboardButton.innerHTML = "Dashboard";
    var adminButton = document.createElement("a");
    adminButton.href = "./auth/admin.html";
    adminButton.innerHTML = "Admin";
    navbar.appendChild(borrowButton);
    navbar.appendChild(dashboardButton);
    navbar.appendChild(adminButton);
}
else if(loginType == "user"){
    var borrowButton = document.createElement("a");
    borrowButton.href = "./borrow.html";
    borrowButton.innerHTML = "Borrow";
    var dashboardButton = document.createElement("a");
    dashboardButton.href = "./auth/dashboard.html";
    dashboardButton.innerHTML = "Dashboard";
    navbar.appendChild(borrowButton);
    navbar.appendChild(dashboardButton);
}
else{
    console.log("xd");
    var loginButton = document.createElement("a");
    loginButton.href = "./auth/login.html";
    loginButton.innerHTML = "Login";
    var signupButton = document.createElement("a");
    signupButton.href = "./auth/signup.html";
    signupButton.innerHTML = "Signup";
    navbar.appendChild(loginButton);
    navbar.appendChild(signupButton);
}

var list = JSON.parse(localStorage.getItem("books"))  || [];
console.log(list);
document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    var searchType = "T";
    if(document.getElementById("bookAuthor").checked){
        searchType = "A";
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
        else if(queryType == "A"){
            if(book.author.toLowerCase() == queryText.toLowerCase()){
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
            var bookStatus = document.createElement("p");
            bookStatus.className = "book-status";
            bookStatus.innerHTML = (book.borrowStatus == "0")? "Available":"Unavailable";
            bookInfoLink.appendChild(bookTitle);
            bookInfoLink.appendChild(bookAuthor);
            bookInfoLink.appendChild(bookStatus);
            bookInfo.appendChild(bookInfoLink);
            newBook.appendChild(bookInfo);

            document.getElementById("bookList").appendChild(newBook);
            found = (query)?false:true;
        }
    })
}