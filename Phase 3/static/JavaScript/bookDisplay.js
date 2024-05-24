//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
console.log(localStorage.getItem("userID"));
var cookieID = localStorage.getItem("userID");
var loginType;
if(userList){
    userList.forEach(user => {
    if(user.data[0].userID == cookieID){
        loginType = user.data[0].userType;
    }
    })
}
if(loginType == "admin"){
    var borrowButton = document.createElement("a");
    borrowButton.href = "./borrow.html";
    borrowButton.innerHTML = "Borrow";
    var dashboardButton = document.createElement("a");
    dashboardButton.href = "./dashboard.html";
    dashboardButton.innerHTML = "Dashboard";
    var adminButton = document.createElement("a");
    adminButton.href = "./admin.html";
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
    dashboardButton.href = "./dashboard.html";
    dashboardButton.innerHTML = "Dashboard";
    navbar.appendChild(borrowButton);
    navbar.appendChild(dashboardButton);
}
else{
    console.log("xd");
    var loginButton = document.createElement("a");
    loginButton.href = "./login.html";
    loginButton.innerHTML = "Login";
    var signupButton = document.createElement("a");
    signupButton.href = "./signup.html";
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