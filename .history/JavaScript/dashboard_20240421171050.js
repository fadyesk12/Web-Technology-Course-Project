document.addEventListener('DOMContentLoaded', function() {
    // Function to get a cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to clear a cookie
    function clearCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

    // Display the user's name
    var username = getCookie('username'); // Assuming the username is stored in a cookie named 'username'
    if (username) {
        document.getElementById('username').textContent = username;
    } else {
        // Redirect to login page if no username is found
        window.location.href = '../auth/login.html';
    }

    // Logout functionality
    document.querySelector('.logout-button').addEventListener('click', function() {
        clearCookie('username'); // Clear the user's session
        window.location.href = '../auth/login.html'; // Redirect to the login page
    });

    // Basic search functionality
    document.querySelector('.search form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        var searchQuery = document.querySelector('.search input').value;
        console.log('Search query:', searchQuery);
        // Here you would typically make an AJAX request to your backend to perform the search
    });
});
