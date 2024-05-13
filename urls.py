from django.urls import path
from . import views


urlpatterns = [
    path('index/' , views.index , name = 'index') , 
    path('add_book/' , views.add_book , name = 'add_book') , 
    path('book_list/' , views.book_list , name = 'book_list') , 
    path('bookDisplay/' , views.bookDisplay , name = 'bookDisplay') , 
    path('borrow/' , views.borrow , name = 'borrow') , 
    
]