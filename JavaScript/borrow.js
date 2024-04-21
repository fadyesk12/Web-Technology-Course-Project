//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
var cookieID = document.cookie.split('; ').find(row => row.startsWith('userID='))?.split('=')[1];
var loginType;
if(userList){
    userList.forEach(user => {
    if(user.userID == cookieID){
        loginType = user.userType;
    }
    })
}
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

var list = JSON.parse(localStorage.getItem("books"))  || [];
var selectMenu = document.getElementById("book");

list.forEach(book => {
    if(book.borrowStatus == "0"){
        var option = document.createElement("option");
        option.value = book.bookName;
        option.innerHTML = book.bookName;
        selectMenu.appendChild(option)
    }
})

var query = window.location.search;
query = query.substring(1);
query = query.replace(/%20/g, " ");
console.log(query);
if(query){
    for(let i = 0; i < selectMenu.options.length; i++){
        if(selectMenu.options[i].text == query){
            console.log("true");
            selectMenu.selectedIndex = i;
            break;
        }
    }
}

var form = document.getElementById("borrowForm");
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const cookieID = document.cookie.split('; ').find(row => row.startsWith('userID='))?.split('=')[1];
    var userList = JSON.parse(localStorage.getItem("userInfoArray"))  || [];
    list.forEach(book => {
        if(book.bookName == selectMenu.options[selectMenu.selectedIndex].value){
            book.borrowStatus = "1";
            userList.forEach(user =>{
                if(user.userID == cookieID){
                    user.borrowedBooks.push(book.bookID);
                }
            })
        }
        localStorage.setItem('userInfoArray', JSON.stringify(userList));
        localStorage.setItem('books', JSON.stringify(list));
    })

    window.location.href = "./auth/dashboard.html";
})