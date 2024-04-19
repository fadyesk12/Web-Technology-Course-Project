document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
      const email = document.getElementById("email").value.trim();
      const userType = document.getElementById("usertype").value;
  
      // Validate inputs
      if (!username || !password || !confirmPassword || !email) {
        alert("Please fill in all fields.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      // Prepare data to send to the server
      const userData = {
        username: username,
        password: password,
        email: email,
        userType: userType
      };
  
      // Send data to the server-side script
      sendDataToServer(userData);
    });