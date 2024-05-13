from django.shortcuts import render

# Create your views here.

def signup(request):
    return render(request,'authpages/signup.html')

def login(request):
    return render(request,'authpages/login.html')

def dashboard(request):
    return render(request,'authpages/dashboard.html')

def admin(request):
    return render(request,'authpages/admin.html')

def edit(request):
    return render(request,'authpages/edit.html')