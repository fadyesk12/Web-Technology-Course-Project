//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray")) || [];
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
    var loginButton = document.createElement("a");
    loginButton.href = "./login.html";
    loginButton.innerHTML = "Login";
    var signupButton = document.createElement("a");
    signupButton.href = "./signup.html";
    signupButton.innerHTML = "Signup";
    navbar.appendChild(loginButton);
    navbar.appendChild(signupButton);
}
document.addEventListener('DOMContentLoaded', function() {
    // Function to get a cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Retrieve the user's name and user type from cookies
    var username = userList[0].data[0].userName;
    var userRole = userList[0].data[0].userType;

    // Check if the cookies exist and display the user's name and user type
    if (username && userRole) {
        // Assuming you have elements with IDs 'userNameDisplay' and 'userRoleDisplay'
        document.getElementById('userNameDisplay').textContent = username;
        document.getElementById('userRoleDisplay').textContent = userRole;
    }
});

document.getElementById('logout').addEventListener('submit', function(event) {
    event.preventDefault();
    localStorage.removeItem("userID");
    localStorage.removeItem('userInfoArray')
    window.location.href = "./index.html";
})
$.ajax({
    url: "http://127.0.0.1:8000/members/retrieveBooks",
    type: "POST",
    data:{
    },
    dataType: 'json',
    success: function (data) {
        // var list = JSON.parse(localStorage.getItem("books"))  || [];
        var list = data['list'] || []
        console.log(list)
        $.ajax({
            url: "http://127.0.0.1:8000/members/retrieveBorrowed",
            type: "POST",
            data:{
                uID: cookieID
            },
            dataType: 'json',
            success: function (data) {
                // var list = JSON.parse(localStorage.getItem("books"))  || [];
                var dataList = data['list'] || []
                // var i;
                // console.log(dataList)
                // for (i = 0; i < dataList.length; i++) {
                //     console.log(i)
                //     if (dataList[i]['userName'] == userList[0].data[0].userName){
                //         break
                //     }
                // }
                var borrowedList = JSON.parse(dataList[0].borrowedBooks)
                // console.log(borrowedList)
                // console.log(list)
                if(borrowedList.length < 1){
                    var message = document.createElement("p");
                    message.innerHTML = "No books are currently borrowed check out the books page to find books you want to borrow.";
                    var div = document.getElementById("dashboard");
                    div.appendChild(message);
                }
                else{
                    list.forEach(book => {
                        borrowedList.forEach(borrowed =>{
                            if(book.bookID == borrowed){
                                const newBook = document.createElement("div");
                                newBook.className = "book";
                                var bookLink = document.createElement("a");
                                bookLink.href = "bookDisplay.html?" + book.bookID;
                                var coverImage = document.createElement("img");
                                coverImage.src = book.imgData;
                                coverImage.alt = "Book Cover"
                                bookLink.appendChild(coverImage);
                                newBook.appendChild(bookLink);
                                
                                var bookInfo = document.createElement("div");
                                bookInfo.className = "book-info";
                                var bookInfoLink = document.createElement("a");
                                bookInfoLink.href = "bookDisplay.html?" + book.bookID;
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
                            }
                        })
                    })
                }
                
            }    
        })
    }    
})
// var list = JSON.parse(localStorage.getItem("books"))  || [];
// var borrowedList = userList[0].data[0].borrowedBooks || [];
// console.log(borrowedList)
document.getElementById("returnBooks").addEventListener('submit', function(event) {
    event.preventDefault();
    $.ajax({
        url: "http://127.0.0.1:8000/members/retrieveBooks",
        type: "POST",
        data:{
        },
        dataType: 'json',
        success: function (data) {
            // var list = JSON.parse(localStorage.getItem("books"))  || [];
            var list = data['list'] || []
            console.log(list)
            $.ajax({
                url: "http://127.0.0.1:8000/members/retrieveBorrowed",
                type: "POST",
                data:{
                    uID: cookieID
                },
                dataType: 'json',
                success: function (data) {
                    // var list = JSON.parse(localStorage.getItem("books"))  || [];
                    var dataList = data['list'] || []
                    var borrowedList = JSON.parse(dataList[0].borrowedBooks)
                    list.forEach(book =>{
                        borrowedList.forEach(borrowed =>{
                            if(book.bookID == borrowed){
                                $.ajax({
                                    url: "http://127.0.0.1:8000/members/returnBook",
                                    type: "POST",
                                    data:{
                                        bID: book.bookID,
                                        status: '0'
                                    },
                                    dataType: 'json',
                                    success: function (data) {
                                        console.log(data)
                                    }
                                })
                            }
                        })
                    })
                    borrowedList = [];
                    borrowedList = JSON.stringify(borrowedList)
                    $.ajax({
                        url: "http://127.0.0.1:8000/members/updateUser",
                        type: "POST",
                        data:{
                            uID: cookieID,
                            borrowedList: borrowedList,
                        },
                        dataType: 'json',
                        success: function (data) {
                            console.log(data)
                            alert('Book borrowed successfuly')
                        }
                    })
                    // var bookListString = JSON.stringify(list);
                    // userList[cookieID].borrowedBooks = borrowedList;
                    // var userInfoArrayString = JSON.stringify(userList);
                    // localStorage.setItem('userInfoArray', userInfoArrayString);
                    // localStorage.setItem('books', bookListString);
                    window.location.href = "./dashboard.html";
                }
            })
        }
    })
    
})
