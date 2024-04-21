//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
var cookieID = document.cookie.split('; ').find(row => row.startsWith('userID='))?.split('=')[1];
var loginType;
userList.forEach(user => {
    if(user.userID == cookieID){
        loginType = user.userType;
    }
})
if(loginType == "Admin"){
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
else if(loginType == "User"){
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

document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    var searchType = "T";
    window.location.href = "./book_list.html?" + document.getElementById("searchText").value + searchType;
})

var bookList = JSON.parse(localStorage.getItem("books"))  || [];
var bookNumber = window.location.search.substring(1);
var book;
bookList.forEach(bookItem =>{
    if(bookItem.bookID == bookNumber){
        book = bookItem;
    }
})
document.getElementById("title").innerHTML = book.bookName;
document.getElementById("bookTitle").innerHTML = book.bookName;
document.getElementById("coverImage").src = localStorage.getItem(book.imgData);
var status = (book.borrowStatus == "0")? "Available for borrowing":"Unavailable for borrowing"
document.getElementById("author").innerHTML = "Author: " + book.author;
document.getElementById("category").innerHTML = "Category: " + book.category;
document.getElementById("status").innerHTML = "Borrow status: " + status;

if(book.borrowStatus == "0"){
    var borrowArea = document.createElement("div");
    borrowArea.id = "borrowRequest";
    var borrowButton = document.createElement("a");
    borrowButton.href = "./borrow.html?" + book.bookName;
    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Request Book";
    borrowButton.appendChild(submitButton);
    borrowArea.appendChild(borrowButton);
    document.getElementById("bookInfo").appendChild(borrowArea);
}

var description = book.description;
dscrp = document.createElement("p");
dscrp.innerHTML = description;
document.getElementById("bookInfo").appendChild(dscrp);