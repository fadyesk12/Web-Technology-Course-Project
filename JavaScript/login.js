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
else if(loginType == "User"){
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

document.addEventListener('DOMContentLoaded', function() {
  // Get the login form element
  var loginForm = document.getElementById('userForm');

  // Attach an event listener for the form submission
  loginForm.addEventListener('submit', function(event) {
      // Prevent the form from submitting normally
      event.preventDefault();

      // Get the username and password from the input fields
      var loginUsername = document.getElementById('username').value;
      var loginPassword = document.getElementById('password').value;

      // Retrieve the stored user information array from local storage
      var storedUserInfoArray = JSON.parse(localStorage.getItem('userInfoArray')) || [];

      // Check if the username and password match any stored user
      var isLoginSuccessful = false;
      storedUserInfoArray.forEach(function(userInfo) {
          if (userInfo.userName === loginUsername) {
              isLoginSuccessful = true;
              alert('Login successful. User type: ' + userInfo.userType);
              // Optionally, redirect the user to another page or perform other actions
              return; // Exit the loop once a match is found
          }
      });

      if (!isLoginSuccessful) {
          // If no match is found, notify the user
          alert('Login failed. Please check your username and password.');
      }

      loginForm.reset();
  });
});
