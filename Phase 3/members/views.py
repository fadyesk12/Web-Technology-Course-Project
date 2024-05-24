from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from .models import Users, Books
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

@csrf_exempt
def Add_book(request):
    template = loader.get_template('Add_book.html')
    return HttpResponse(template.render())

@csrf_exempt
def admin(request):
    template = loader.get_template('admin.html')
    return HttpResponse(template.render())

@csrf_exempt
def book_list(request):
    template = loader.get_template('book_list.html')
    return HttpResponse(template.render())

@csrf_exempt
def bookDisplay(request):
    template = loader.get_template('bookDisplay.html')
    return HttpResponse(template.render())

@csrf_exempt
def borrow(request):
    template = loader.get_template('borrow.html')
    return HttpResponse(template.render())

@csrf_exempt
def dashboard(request):
    template = loader.get_template('dashboard.html')
    return HttpResponse(template.render())

@csrf_exempt
def edit(request):
    template = loader.get_template('edit.html')
    return HttpResponse(template.render())

@csrf_exempt
def login(request):
    template = loader.get_template('login.html')
    return HttpResponse(template.render())

@csrf_exempt
def signup(request):
    template = loader.get_template('signup.html')
    return HttpResponse(template.render())

@csrf_exempt
def addUser(request):
    data = {'success': False} 
    if request.method == 'POST':
        uID = request.POST.get('userID')
        Name = request.POST.get('userName')
        Type = request.POST.get('userType')
        Password = request.POST.get('userPassword')
        user = Users()
        user.userID = uID
        user.userName = Name
        user.userType = Type
        user.userPassword = Password
        user.save()
    data['success'] = True
    return JsonResponse(data)

@csrf_exempt
def addBook(request):
    if request.method == 'POST':
        Name = request.POST.get('bookName')
        bID = request.POST.get('bookID')
        auth = request.POST.get('author')
        cat = request.POST.get('category')
        desc = request.POST.get('description')
        status = request.POST.get('borrowStatus')
        img = request.POST.get('imgData')
        book = Books()
        book.bookName = Name
        book.bookID = bID
        book.author = auth
        book.category = cat
        book.description = desc
        book.borrowStatus = status
        book.imgData = img
        book.save()

@csrf_exempt
def checkUser(request):
    obj = list(Users.objects.filter(userName = request.POST.get('Username')).values())
    for x in obj:
        if x['userPassword'] == request.POST.get('Password'):
            data = {'data' : obj}
            return JsonResponse(data)
    data = {'success': False} 
    return JsonResponse(data)