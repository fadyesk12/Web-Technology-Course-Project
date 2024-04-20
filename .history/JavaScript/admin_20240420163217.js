function loadBooksFromLocalStorage() {
    // Retrieve the array of books from local storage
    const bookData = JSON.parse(localStorage.getItem('books'));

    // Check if the book data exists
    if (bookData) {
        // Get the book list container
        const bookList = document.getElementById('bookList');

        // Iterate over each book in the array
        bookData.forEach(book => {
            // Create a new book row
            const bookRow = document.createElement('div');
            bookRow.className = 'book-row';

            // Create an image element for the book cover
            const bookCover = document.createElement('img');
            bookCover.src = getItem(book.imgData)
            bookCover.alt = 'Book Cover';
            bookCover.className = 'book-cover';

            // Create a span element for the book title and author
            const bookInfo = document.createElement('span');
            bookInfo.textContent = `${book.title} by ${book.author}`;

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
            bookList.appendChild(bookRow);
        });
    }
}

// Call the function to load the books from local storage
loadBooksFromLocalStorage();
