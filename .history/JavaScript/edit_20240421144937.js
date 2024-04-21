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
            document.getElementById('book-name').value = book.book;
            document.getElementById('book-id').value = book.bookID;
            document.getElementById('author').value = book.author;
            document.getElementById('category').value = book.category;
            document.getElementById('description').value = book.description;
            // Note: You cannot directly set the value of a file input for security reasons.
            // You might need to display the current image and allow the user to upload a new one.
        } else {
            alert('Book not found');
        }
    } else {
        alert('No book ID provided');
    }
});