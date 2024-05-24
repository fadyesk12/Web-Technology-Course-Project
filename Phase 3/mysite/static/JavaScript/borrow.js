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

    }
})

var selectMenu = document.getElementById("book");


var form = document.getElementById("borrowForm");
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const cookieID = localStorage.getItem("userID");
    $.ajax({
        url: "http://127.0.0.1:8000/members/retrieveBooks",
        type: "POST",
        data:{
        },
        dataType: 'json',
        success: function (data) {
            // var list = JSON.parse(localStorage.getItem("books"))  || [];
            var list = data['list'] || []
            var userList = JSON.parse(localStorage.getItem("userInfoArray"))  || [];
            list.forEach(book => {
                if(book.bookName == selectMenu.options[selectMenu.selectedIndex].value){
                    // book.borrowStatus = "1";
                    userList.forEach(user =>{
                        if(user.data[0].userID == cookieID){
                            console.log(book.bookID)

                            borrowedBooks = user.data[0].borrowedBooks  || [];
                            console.log(borrowedBooks)
                            borrowedBooks.push(book.bookID)
                            localStorage.setItem('userInfoArray', JSON.stringify(userList));
                            $.ajax({
                                url: "http://127.0.0.1:8000/members/updateUser",
                                type: "POST",
                                data:{
                                    uID: cookieID,
                                    borrowedList: borrowedBooks,
                                },
                                dataType: 'json',
                                success: function (data) {
                                    alert('Book borrowed successfuly')
                                }
                            })
                            $.ajax({
                                url: "http://127.0.0.1:8000/members/borrowBook",
                                type: "POST",
                                data:{
                                    bID: book.bookID,
                                    status: "1"
                                },
                                dataType: 'json',
                                success: function (data) {
                                    list = data['list'] || []
                                    console.log(list)
                                    alert('Book borrowed successfuly')
                                }
                            })
                        }
                    })
                }
                // localStorage.setItem('books', JSON.stringify(list));
            })

        }
    })
    
    // window.location.href = "./dashboard.html";
})