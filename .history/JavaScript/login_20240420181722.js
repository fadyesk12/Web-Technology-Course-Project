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
                 // Store the user's information in local storage
                 localStorage.setItem('loggedInUser', JSON.stringify({username: loginUsername, userType: userType}));
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

    // Check if there is a logged-in user and update the UI accordingly
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        // Update the UI based on the logged-in user's information
        // For example, display a welcome message or update the navigation bar
        console.log('Welcome, ' + loggedInUser.username + '!');
    }
});

// Example function to log out the user
function logout() {
    // Remove the user's information from local storage
    localStorage.removeItem('loggedInUser');
    // Optionally, redirect the user to the login page
    window.location.href = 'login.html'; // Adjust the path as necessary
}
