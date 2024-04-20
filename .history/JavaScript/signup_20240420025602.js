document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('userForm');

  

  // Attach an event listener for the form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get the username and user type from the form
      var userName = document.getElementById('username');
      var userType = document.getElementById('usertype');


      // Create an object to store the user's information
      var userInfo = {
          userName: userName.value,
          userType: userType.value
      };

      // Convert the userInfo object to a JSON string
      var userInfoString = JSON.stringify(userInfo);

      // Store the JSON string in local storage
      localStorage.setItem('userInfo', userInfoString);

      alert('Your name and user type have been saved: ' + userName.value);
  });
});
