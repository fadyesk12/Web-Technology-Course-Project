//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
var cookieID = document.cookie.split('; ').find(row => row.startsWith('userID='))?.split('=')[1];
var loginType;
if(userList){
    userList.forEach(user => {
    if(user.userID == cookieID){
        loginType = user.userType;
    }
    })
}
if(loginType == "Admin"){
    var borrowButton = document.createElement("a");
    borrowButton.href = "../borrow.html";
    borrowButton.innerHTML = "Borrow";
    var dashboardButton = document.createElement("a");
    dashboardButton.href = "./dashboard.html";
    dashboardButton.innerHTML = "Dashboard";
    var adminButton = document.createElement("a");
    adminButton.href = "./admin.html";
    adminButton.innerHTML = "Admin";
    navbar.appendChild(borrowButton);
    navbar.appendChild(dashboardButton);
    navbar.appendChild(adminButton);
}
else if(loginType == "User"){
    var borrowButton = document.createElement("a");
    borrowButton.href = "../borrow.html";
    borrowButton.innerHTML = "Borrow";
    var dashboardButton = document.createElement("a");
    dashboardButton.href = "./dashboard.html";
    dashboardButton.innerHTML = "Dashboard";
    navbar.appendChild(borrowButton);
    navbar.appendChild(dashboardButton);
}
else{
    console.log("xd");
    var loginButton = document.createElement("a");
    loginButton.href = "./login.html";
    loginButton.innerHTML = "Login";
    var signupButton = document.createElement("a");
    signupButton.href = "./signup.html";
    signupButton.innerHTML = "Signup";
    navbar.appendChild(loginButton);
    navbar.appendChild(signupButton);
}

// Preview the selected image before submitting the form
const coverImageInput = document.getElementById('coverImage');
const imagePreview = document.getElementById('imagePreview');

var coverImage;

coverImageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;
      img.className = 'preview';
      imagePreview.innerHTML = '';
      imagePreview.appendChild(img);
      // saving the image as a base 64 encoded string
      coverImage = document.getElementById('imagePreview').firstChild;
      imgData = coverImage.src;
      localStorage.setItem("imgData", imgData);
    }
    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = '';
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the bookID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookID = urlParams.get('bookID');

    if (bookID) {
        // Load the book's information from local storage
        const bookData = JSON.parse(localStorage.getItem('books')) || [];
        const book = bookData.find(b => b.bookID === bookID);

        if (book) {
            // Populate the form fields with the book's information
            document.getElementById('book-name').value = book.bookName;
            document.getElementById('book-id').value = book.bookID;
            document.getElementById('author').value = book.author;
            document.getElementById('category').value = book.category;
            document.getElementById('description').value = book.description;
            // Note: Handling the cover image update is more complex because you cannot directly set the value of a file input.
            // You might need to display the current image and allow the user to upload a new one.
        } else {
            alert('Book not found');
        }
    } else {
        alert('No book ID provided');
    }

    document.getElementById('book-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        updateBookInLocalStorage(); // Call the function to update the book in local storage
    });

    function updateBookInLocalStorage() {
        // Get the bookID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const bookID = urlParams.get('bookID');

        if (bookID) {
            // Load the book's information from local storage
            let bookData = JSON.parse(localStorage.getItem('books')) || [];

            // Find the book by ID
            const bookIndex = bookData.findIndex(b => b.bookID === bookID);
            if (bookIndex !== -1) {
                // Update the book's information
                bookData[bookIndex].bookName = document.getElementById('book-name').value;
                bookData[bookIndex].author = document.getElementById('author').value;
                bookData[bookIndex].category = document.getElementById('category').value;
                bookData[bookIndex].description = document.getElementById('description').value;

                var image = localStorage.getItem("imgData");
                var ID = bookData[bookIndex].bookID;
                var bookCoverKey = "Cover" + ID;
                localStorage.setItem(bookCoverKey, image);
                bookData[bookIndex].imgData = bookCoverKey;
                localStorage.removeItem("imgData");
                // Save the updated book data back to local storage
                localStorage.setItem('books', JSON.stringify(bookData));

                alert('Book updated successfully');
            } else {
                alert('Book not found');
            }
        } else {
            alert('No book ID provided');
        }
    }
});
