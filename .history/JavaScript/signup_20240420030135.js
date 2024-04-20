document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('userForm');

  // Attach an event listener for the form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get the username and user type from the form
      var userName = document.getElementById('username').value;
      var userType = document.getElementById('usertype').value;

      // Create an object to store the user's information
      var userInfo = {
          userName: userName,
          userType: userType
      };

      // Retrieve the existing user information array from local storage
      var storedUserInfoArray = JSON.parse(localStorage.getItem('userInfoArray')) || [];

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
