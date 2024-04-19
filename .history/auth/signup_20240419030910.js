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
    registerUser(username, password, email, userType);
});

// Assuming you have a function to send the data to your server
function registerUser(username, password, email, userType) {
    // Example AJAX request using fetch
    fetch('/save-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, userType }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show the server's response
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    });
}
