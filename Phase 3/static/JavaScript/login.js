//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
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
    // // Function to set a cookie
    // function setCookie(name, value, days) {
    //     var expires = "";
    //     if (days) {
    //         var date = new Date();
    //         date.setTime(date.getTime() + (days*24*60*60*1000));
    //         expires = "; expires=" + date.toUTCString();
    //     }
    //     document.cookie = name + "=" + (value || "") + expires + "; path=/";
    // }

    // // Function to get a cookie
    // function getCookie(name) {
    //     var nameEQ = name + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i=0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    //         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    //     }
    //     return null;
    // }

    // Attach an event listener for the form submission
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var loginUsername = document.getElementById('username').value;
        var loginPassword = document.getElementById('password').value;
        var user
        $.ajax({
            url: "http://127.0.0.1:8000/members/checkUser",
            type: "POST",
            data:{
                Username: loginUsername,
                Password: loginPassword,
            },
            dataType: 'json',
            success: function (data) {
                if (data['success'] == false){
                    alert("check username and password")
                    return
                }
                else{
                    user = data
                    var storedUserInfoArray;
                    try {
                        storedUserInfoArray = JSON.parse(localStorage.getItem('userInfoArray')) || [];
                    } catch (error) {
                        console.error('Error parsing user information from local storage:', error);
                        alert('An error occurred. Please try again.');
                        return;
                    }
                    storedUserInfoArray.push(user)
                    console.log(storedUserInfoArray)
                    var isLoginSuccessful = false;
                    storedUserInfoArray.forEach(userInfo => {
                        if (userInfo.data[0].userName == loginUsername) {
                            isLoginSuccessful = true;
                            alert('Login successful. User type: ' + userInfo.data[0].userType);
                            localStorage.setItem("userID", userInfo.userID);
                            // document.cookie = "userID=" + userInfo.userID + "; path=../";
                            // console.log(decodeURIComponent(document.cookie));
                            window.location.href = './index.html';
                            return; // Exit the loop once a match is found
                        }
                    });

                    if (!isLoginSuccessful) {
                        alert('Login failed. Please check your username and password.');
                    }
                }
            }
        });
        
        
    });
});
