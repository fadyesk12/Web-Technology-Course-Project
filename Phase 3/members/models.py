from django.db import models

# Create your models here.

class Books(models.Model):
    bookName = models.CharField(max_length=255)
    bookID = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    borrowStatus = models.CharField(max_length=255)
    imgData = models.CharField(max_length=255)

class Users(models.Model):
    userID = models.CharField(max_length=255)
    userName = models.CharField(max_length=255)
    userType = models.CharField(max_length=255)
    userPassword = models.CharField(max_length=255)
    borrowedBooks = models.TextField(max_length=255, null=True)
