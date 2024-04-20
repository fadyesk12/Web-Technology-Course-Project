document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('userForm');

  // Attach an event listener for the form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      var userName = document.getElementById('username').value;
      var userType = document.getElementById('usertype').value;

      // Combine the userName and userType into a single string
      var userInfo = 'userName: ' + userName + ', userType: ' + userType;

      // Store the combined string in local storage
      localStorage.setItem('userInfo', userInfo);

      alert('Your name and user type have been saved: ' + userName);
  });
});
