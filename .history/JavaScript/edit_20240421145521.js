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
                bookData[bookIndex].bookNam = document.getElementById('book-name').value;
                bookData[bookIndex].author = document.getElementById('author').value;
                bookData[bookIndex].category = document.getElementById('category').value;
                bookData[bookIndex].description = document.getElementById('description').value;

                // Note: Handling the cover image update is more complex because you cannot directly set the value of a file input.
                // You might need to upload the new image to a server and update the book's image URL in local storage.

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
