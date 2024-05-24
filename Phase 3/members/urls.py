from django.urls import path
from . import views
urlpatterns = [ 
    path("", views.index, name='index'),
    path("index.html", views.index, name='index'),
    path("Add_book.html", views.Add_book, name='Add_book'),
    path("admin.html", views.admin, name='admin'),
    path("book_list.html", views.book_list, name='book_list'),
    path("bookDisplay.html", views.bookDisplay, name='bookDisplay'),
    path("borrow.html", views.borrow, name='borrow'),
    path("dashboard.html", views.dashboard, name='dashboard'),
    path("edit.html", views.edit, name='edit'),
    path("login.html", views.login, name='login'),
    path("signup.html", views.signup, name='signup'),
    path("addUser", views.addUser, name='addUser'),
    path("checkUser", views.checkUser, name='checkUser')
]