//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
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
    borrowButton.href = "../borrow.html";
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
    borrowButton.href = "../borrow.html";
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
    // Attach an event listener for the form submission
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var loginUsername = document.getElementById('username').value;
        var loginPassword = document.getElementById('password').value;

        var storedUserInfoArray;
        try {
            storedUserInfoArray = JSON.parse(localStorage.getItem('userInfoArray')) || [];
        } catch (error) {
            console.error('Error parsing user information from local storage:', error);
            alert('An error occurred. Please try again.');
            return;
        }

        var isLoginSuccessful = false;
        storedUserInfoArray.forEach(userInfo => {
            if (userInfo.userName === loginUsername) {
                isLoginSuccessful = true;
                alert('Login successful. User type: ' + userInfo.userType);
                localStorage.setItem("userID", userInfo.userID);
                // document.cookie = "userID=" + userInfo.userID + "; path=../";
                // console.log(decodeURIComponent(document.cookie));
                window.location.href = './login.html';
                return; // Exit the loop once a match is found
            }
        });

        if (!isLoginSuccessful) {
            alert('Login failed. Please check your username and password.');
        }
    });
});
