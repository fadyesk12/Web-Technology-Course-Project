var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray")) || [];
console.log(localStorage.getItem("userID"));
var cookieID = localStorage.getItem("userID");
var loginType;
if (userList) {
    userList.forEach(user => {
        if (user.data[0].userID == cookieID) {
            loginType = user.data[0].userType;
        }
    })
}
if (loginType == "admin") {
    var borrowButton = document.createElement("a");
    borrowButton.href = "./borrow.html";
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
else if (loginType == "user") {
    var borrowButton = document.createElement("a");
    borrowButton.href = "./borrow.html";
    borrowButton.innerHTML = "Borrow";
    var dashboardButton = document.createElement("a");
    dashboardButton.href = "./dashboard.html";
    dashboardButton.innerHTML = "Dashboard";
    navbar.appendChild(borrowButton);
    navbar.appendChild(dashboardButton);
}
else {
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



$.ajax({
    url: "http://127.0.0.1:8000/members/retrieveBooks",
    type: "POST",
    data: {

    },
    dataType: 'json',
    success: function (data) {
        var bookList = data['list'] || []
        const urlParams = new URLSearchParams(window.location.search);
        const bookID = urlParams.get('bookID');
        console.log(bookID);
        var book;
        bookList.forEach(bookItem => {
            if (bookItem.bookID == bookID) {
                book = bookItem;
            }
        })
        console.log(book)
        if (book) { // Check if book is found
            document.getElementById("book-name").value = book.bookName;
            document.getElementById("book-id").value = book.bookID;
            document.getElementById("author").value = book.author;
            document.getElementById("category").value = book.category;
            document.getElementById("description").value = book.description;
        } else {
            // Handle case when book with specified ID is not found
            console.log("Book not found");
        }
    }
})

document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var name = document.getElementById("book-name").value ;
    var id = document.getElementById("book-id").value ;
    var author = document.getElementById("author").value; 
    var cat = document.getElementById("category").value ;
    var des = document.getElementById("description").value; 
    var img = localStorage.getItem("imgData");
    $.ajax({
        url: "http://127.0.0.1:8000/members/updateBook",
        type: "POST",
        data: {
            bookName: name,
            bookID: id,
            author: author,
            category: cat,
            description: des,
            imgData: img,
            
        },
        dataType: 'json',
        success: function (data) {
            alert('Book info updated')
            window.location.href = "./admin.html"
        }
    })
        
});