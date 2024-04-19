document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
   
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const userType = document.getElementById('usertype').value;
   
    // Basic validation
    if (password !== confirmPassword) {
       alert('Passwords do not match!');
       return;
    }
   
    if (!email.includes('@')) {
       alert('Please enter a valid email address.');
       return;
    }
   
    // Proceed with AJAX request...
   });
   