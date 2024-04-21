//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
console.log(userList);
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


document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    var searchType = "T";
    window.location.href = "./book_list.html?" + document.getElementById("searchText").value + searchType;
})

var bookList = JSON.parse(localStorage.getItem("books"))  || [];
var introduction = document.getElementById("introduction");
var featured = document.getElementById("featured");

introduction.innerHTML = (bookList.length > 0)?"Take a look at our featured books!":"No books added yet. Sign in as an admin to add a book.";
if(bookList.length < 1 && loginType == "admin"){
    var welcoming = document.getElementById("welcoming");
    var anchor = document.createElement("a");
    anchor.href = "./Add_book.html";
    var button = document.createElement("button");
    button.innerHTML = "Add Book";
    anchor.appendChild(button);
    console.log(welcoming);
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