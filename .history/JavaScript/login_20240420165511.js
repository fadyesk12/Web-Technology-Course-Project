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
         var userType = '';
         storedUserInfoArray.forEach(function(userInfo) {
             if (userInfo.userName === loginUsername && userInfo.password === loginPassword) {
                 isLoginSuccessful = true;
                 userType = userInfo.userType;
                 alert('Login successful. User type: ' + userType);
                 // Exit the loop once a match is found
                 return;
             }
         });
   
         if (isLoginSuccessful) {
             // If login is successful, check user type and redirect accordingly
             if (userType === 'admin') {
                 // Redirect to the admin page
                 window.location.href = 'admin.html'; // Adjust the path as necessary
   
                 // Add a link to the admin page in the navigation bar
                 var navbar = document.getElementById('navbar');
                 var adminLink = document.createElement('a');
                 adminLink.href = 'admin.html'; // Adjust the path as necessary
                 adminLink.textContent = 'Admin';
                 navbar.appendChild(adminLink);
             } else {
                 // Optionally, redirect the user to another page or perform other actions
                 alert('Login successful. Redirecting...');
                 // window.location.href = 'user_dashboard.html'; // Example redirect
             }
         } else {
             // If no match is found, notify the user
             alert('Login failed. Please check your username and password.');
         }
   
         loginForm.reset();
    });
   });
   