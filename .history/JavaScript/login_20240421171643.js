document.addEventListener('DOMContentLoaded', function() {
    // Function to set a cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

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

    // Attach an event listener for the form submission
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var loginUsername = document.getElementById('username').value;
        var loginPassword = document.getElementById('password').value;

        var storedUserInfoArray;
        try {
            storedUserInfoArray = JSON.parse(localStorage.getItem('userInfoArray')) || [];
        } catch (error) {
            console.error('Error parsing user information from local storage:', error);
            alert('An error occurred. Please try again.');
            return;
        }

        var isLoginSuccessful = false;
        storedUserInfoArray.forEach(function(userInfo) {
            if (userInfo.userName === loginUsername) {
                isLoginSuccessful = true;
                alert('Login successful. User type: ' + userInfo.userType);
                // Set cookies for user role and username
                setCookie('userRole', userInfo.userType, 7); // Set cookie for 7 days
                setCookie('username', loginUsername, 7); // Set cookie for 7 days
                window.location.href = '../index.html'; // Example redirect URL
                return; // Exit the loop once a match is found
            }
        });

        if (!isLoginSuccessful) {
            alert('Login failed. Please check your username and password.');
        }
    });

    // Example usage of getCookie to check user role and username on page load
    var userRole = getCookie('userRole');
    var username = getCookie('username');
    if (userRole && username) {
        console.log('User role:', userRole);
        console.log('Username:', username);
        // Adjust the UI or access based on the user's role and username
    } else {
        console.log('No user role or username cookie found');
    }
});
