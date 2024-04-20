document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('userForm');

  // Attach an event listener for the form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      var userName = document.getElementById('username').value;
      var userType = document.getElementById('usertype').value;

      
      localStorage.setItem('userName: ', userName,' userType: ',userType);

      // Optionally, display a message to the user
      alert('Your name has been saved: ' + userName);
  });
});
