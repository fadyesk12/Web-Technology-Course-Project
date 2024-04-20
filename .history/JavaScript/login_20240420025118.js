document.addEventListener('DOMContentLoaded', function() {
  // Get the login form element
  var form = document.getElementById('userForm');

  // Attach an event listener for the form submission
  loginForm.addEventListener('submit', function(event) {
      // Prevent the form from submitting normally
      event.preventDefault();

      // Get the username and password from the input fields
      var loginUsername = document.getElementById('username').value;
      var loginPassword = document.getElementById('password').value;

      // Retrieve the stored user information from local storage
      var storedUserInfo = localStorage.getItem('userInfo');

      // Parse the stored user information
      var parsedUserInfo = JSON.parse(storedUserInfo);

      // Check if the username and password match any stored user
      if (parsedUserInfo && parsedUserInfo.userName === loginUsername && parsedUserInfo.password === loginPassword) {
          // If a match is found, return the user type
          alert('Login successful. User type: ' + parsedUserInfo.userType);
          // Optionally, redirect the user to another page or perform other actions
      } else {
          // If no match is found, notify the user
          alert('Login failed. Please check your username and password.');
      }
  });
});
