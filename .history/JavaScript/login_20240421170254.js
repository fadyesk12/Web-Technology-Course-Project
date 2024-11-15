<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User login</title>
  <link rel="stylesheet" href="../Styling/login.css">
</head>

<body>
  <div id="navbar">
    <a href="../index.html">Home</a>
    <a href="../book_list.html">Books</a>
    <a href="../borrow.html">Borrow</a>
    <a href="../auth/login.html">Login</a>
    <a href="../auth/signup.html">Sign Up</a>
  </div>

  <div class="container">
    <h2>User login</h2>
    <form id="userForm">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <input type="submit" value="Login">
    </form>
  </div>
  <script src="../JavaScript/login.js"></script>
</body>

</html>