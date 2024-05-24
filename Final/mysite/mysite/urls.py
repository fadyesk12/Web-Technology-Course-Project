"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('members/', include('members.urls')),
    path('members/index.html', include('members.urls')),
    path('members/book_list.html', include('members.urls')),
    path('members/Add_book.html', include('members.urls')),
    path('members/admin.html', include('members.urls')),
    path('members/bookDisplay.html', include('members.urls')),
    path('members/borrow.html', include('members.urls')),
    path('members/dashboard.html', include('members.urls')),
    path('members/edit.html', include('members.urls')),
    path('members/login.html', include('members.urls')),
    path('members/signup.html', include('members.urls')),
    path('members/addUser', include('members.urls')),
    path('members/checkUser', include('members.urls')),
    path('members/addBook', include('members.urls')),
    path('members/retrieveBooks', include('members.urls')),
    path('members/delteBook', include('members.urls')),
    path('members/updateUser', include('members.urls')),
    path('members/retrieveBorrowed', include('members.urls')),
    path('members/borrowBook', include('members.urls')),
    path('members/returnBook', include('members.urls')),
    
]
