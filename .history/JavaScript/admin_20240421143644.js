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
        bookInfo.textContent = `${book.bookN} by ${book.author}`;

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';

        // Event listener for the edit button
        editButton.addEventListener('click', function() {
            // Redirect to edit.html
            window.location.href = 'edit.html';
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.bookId = book.bookID;

        // Event listener for the delete button
        deleteButton.addEventListener('click', function() {
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
