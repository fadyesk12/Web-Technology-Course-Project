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
      if (username === "" || password === "" || confirmPassword === "" || email === "") {
        alert("Please fill in all fields.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      // Save user data to a text file
      const userData = `${username},${userType},${email}\n`;
  
      saveToFile(userData);
      alert("User registered successfully!");
  
      // Clear form inputs after successful registration
      form.reset();
    });
  
    function saveToFile(data) {
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.txt";
      document.body.appendChild(a);
      a.click();
  
      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  });
  