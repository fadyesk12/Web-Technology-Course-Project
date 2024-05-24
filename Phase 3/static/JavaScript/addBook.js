//Determine the user type and what they're supposed to have access to in the navigation bar
var navbar = document.getElementById("navbar");
var userList = JSON.parse(localStorage.getItem("userInfoArray"));
console.log(localStorage.getItem("userID"));
var cookieID = localStorage.getItem("userID");
var loginType;
if(userList){
    userList.forEach(user => {
    if(user.data[0].userID == cookieID){
        loginType = user.data[0].userType;
    }
    })
}
if(loginType == "admin"){
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
else if(loginType == "user"){
    var borrowButton = document.createElement("a");
    borrowButton.href = "./borrow.html";
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

//Store book info in local storage
document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var book = {
        bookName: document.getElementById('book-name').value,
        bookID: document.getElementById('book-id').value,
        author: document.getElementById('author').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        //Book is marked as unborrowed the first time it is added to the local storage
        borrowStatus: "0",
        imgData: ''
    };

    var bookList = JSON.parse(localStorage.getItem("books"))  || [];
    console.log(bookList);
    var image = localStorage.getItem("imgData");
    var ID = book.bookID;
    var bookCoverKey = "Cover" + ID;
    localStorage.setItem(bookCoverKey, image);
    book.imgData = bookCoverKey;
    bookList.push(book);
    bookList = JSON.stringify(bookList);
    localStorage.setItem("books", bookList);
    localStorage.removeItem("imgData");
    window.location.href = "./admin.html";
});