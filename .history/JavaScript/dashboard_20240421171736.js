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

    // Retrieve the user's name and user type from cookies
    var username = getCookie('username');
    var userRole = getCookie('userRole');

    // Check if the cookies exist and display the user's name and user type
    if (username && userRole) {
        // Assuming you have elements with IDs 'userNameDisplay' and 'userRoleDisplay'
        document.getElementById('userNameDisplay').textContent = username;
        document.getElementById('userRoleDisplay').textContent = userRole;
    } else {
        // Redirect to login page if no username or user role is found
        window.location.href = '../auth/login.html';
    }
});
