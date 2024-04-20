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
    window.location.href = "./auth/admin.html";
});