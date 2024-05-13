from django.shortcuts import render 


# Create your views here.


def index(request):
    return render(request, 'pages/index.html')

def add_book(request):
    return render(request, 'pages/add_book.html')

def book_list(request):
    return render(request, 'pages/book_list.html')

def bookDisplay(request):
    return render(request, 'pages/bookDisplay.html')

def borrow(request):
    return render(request, 'pages/borrow.html')

