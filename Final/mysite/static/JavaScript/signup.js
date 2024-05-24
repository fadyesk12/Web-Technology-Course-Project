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

// function addUser(user){
    
// }

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
      var userPassword = document.getElementById('password').value;
      var userID = storedUserInfoArray.length;
      // Validate passwords match
      var confirmPassword = document.getElementById('confirmPassword');
      if (userPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
      // Create an object to store the user's information
      var userInfo = {
          userID: userID,
          userName: userName,
          userType: userType,
          userPassword: userPassword,
          borrowedBooks: []
      };
    //   addUser(userInfo);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/members/addUser",
        data:{
            userID: userID,
            userName: userName,
            userType: userType,
            userPassword: userPassword
        },
        datatype:'json',
        success: function(data) {
            console.log(data)
            if (data['success'] == true)
               alert("successfully added to users")
            else{
                console.log("can't add to users")
            }
        }
    });
    
    // Retrieve the existing user information array from local storage

    //   // Add the new user information to the array
    //   storedUserInfoArray.push(userInfo);

    //   // Convert the updated array to a JSON string
    //   var userInfoArrayString = JSON.stringify(storedUserInfoArray);

    //   // Store the updated array in local storage
    //   localStorage.setItem('userInfoArray', userInfoArrayString);

    //   alert('Your name and user type have been saved: ' + userName);

      // Clear the form after submission
      form.reset();
      window.location.href = "./login.html";
  });
});
