function loadBookFromLocalStorage() {
    // Retrieve the book object from local storage
    const bookData = JSON.parse(localStorage.getItem('book'));

    // Check if the book data exists
    if (bookData) {
        // Create a new book row
        const bookRow = document.createElement('div');
        bookRow.className = 'book-row';

        // Create an image element for the book cover
        const bookCover = document.createElement('img');
        bookCover.src = bookData.imagePath;
        bookCover.alt = 'Book Cover';
        bookCover.className = 'book-cover';

        // Create a span element for the book title and author
        const bookInfo = document.createElement('span');
        bookInfo.textContent = `${bookData.title} by ${bookData.author}`;

        // Create edit and delete buttons
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';

        // Append the elements to the book row
        bookRow.appendChild(bookCover);
        bookRow.appendChild(bookInfo);
        bookRow.appendChild(editButton);
        bookRow.appendChild(deleteButton);

        // Append the book row to the book list
        const bookList = document.getElementById('bookList');
        bookList.appendChild(bookRow);
    }
}

// Call the function to load the book from local storage
loadBookFromLocalStorage();
