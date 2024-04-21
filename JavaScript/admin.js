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

function loadBooksFromLocalStorage() {
    const bookData = JSON.parse(localStorage.getItem('books')) || [];
    const bookList = document.getElementById('bookList');

    bookData.forEach(book => {
        const bookRow = document.createElement('div');
        bookRow.className = 'book-row';

        const bookCover = document.createElement('img');
        bookCover.src = localStorage.getItem(book.imgData);
        bookCover.alt = 'Book Cover';
        bookCover.className = 'book-cover';

        const bookInfo = document.createElement('span');
        bookInfo.textContent = `${book.bookName} by ${book.author}`;

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';

        // Event listener for the edit button
        editButton.addEventListener('click', function() {
            // Redirect to edit.html with the bookID as a query parameter
            window.location.href = 'edit.html?bookID=' + book.bookID;
        });
        
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.bookId = book.bookID;

        // Event listener for the delete button
        deleteButton.addEventListener('click', function () {
            // Remove the book row from the DOM
            bookRow.remove();

            // Remove the book's information from local storage
            const bookKey = `book-${this.dataset.bookId}`;
            localStorage.removeItem(bookKey);

            // Remove the book's image data from local storage
            const imageKey = `Cover${this.dataset.bookId}`;
            localStorage.removeItem(imageKey);

            // Optionally, remove the book from the bookData array and update local storage
            const index = bookData.findIndex(b => b.bookID === this.dataset.bookId);
            if (index !== -1) {
                bookData.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(bookData));
            }
        });

        bookRow.appendChild(bookCover);
        bookRow.appendChild(bookInfo);
        bookRow.appendChild(editButton);
        bookRow.appendChild(deleteButton);

        bookList.appendChild(bookRow);
    });
}

loadBooksFromLocalStorage();
