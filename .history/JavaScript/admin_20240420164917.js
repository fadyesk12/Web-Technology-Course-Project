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
        bookInfo.textContent = `${book.title} by ${book.author}`;

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        // Add a data attribute to store the book's ID or a unique identifier
        deleteButton.dataset.bookId = book.bookID;

        // Event listener for the delete button
        deleteButton.addEventListener('click', function() {
            // Remove the book row from the DOM
            bookRow.remove();

            // Remove the book's information from local storage
            // Assuming the book's information is stored under a key like "book-{bookID}"
            const bookKey = `book-${this.dataset.bookId}`;
            localStorage.removeItem(bookKey);

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
