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
      
  });
});
