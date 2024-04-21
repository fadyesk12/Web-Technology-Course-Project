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
  // Get the form element
  var form = document.getElementById('userForm');

  // Attach an event listener for the form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      var storedUserInfoArray = JSON.parse(localStorage.getItem('userInfoArray')) || [];
      // Get the username and user type from the form
      var userName = document.getElementById('username').value;
      var userType = document.getElementById('usertype').value;
      var userID = storedUserInfoArray.length;
      // Create an object to store the user's information
      var userInfo = {
          userID: userID,
          userName: userName,
          userType: userType,
          borrowedBooks: []
      };

      // Retrieve the existing user information array from local storage

      // Add the new user information to the array
      storedUserInfoArray.push(userInfo);

      // Convert the updated array to a JSON string
      var userInfoArrayString = JSON.stringify(storedUserInfoArray);

      // Store the updated array in local storage
      localStorage.setItem('userInfoArray', userInfoArrayString);

      alert('Your name and user type have been saved: ' + userName);

      // Clear the form after submission
      form.reset();
  });
});
