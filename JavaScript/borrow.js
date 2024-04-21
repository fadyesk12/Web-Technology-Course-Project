document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    var searchType = "T";
    window.location.href = "./book_list.html?" + document.getElementById("searchText").value + searchType;
})

var list = JSON.parse(localStorage.getItem("books"))  || [];
var selectMenu = document.getElementById("book");

list.forEach(book => {
    if(book.borrowStatus == "0"){
        var option = document.createElement("option");
        option.value = book.bookName;
        option.innerHTML = book.bookName;
        selectMenu.appendChild(option)
    }
})

var query = window.location.search;
query = query.substring(1);
query = query.replace(/%20/g, " ");
console.log(query);
if(query){
    for(let i = 0; i < selectMenu.options.length; i++){
        if(selectMenu.options[i].text == query){
            console.log("true");
            selectMenu.selectedIndex = i;
            break;
        }
    }
}

var form = document.getElementById("borrowForm");
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
})