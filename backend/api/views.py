from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import *
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import ToDo


class createUseView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class todolistCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ToDo.objects.filter(auther=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(auther=self.request.user)
        else:
            print(serializer.errors)


class todolistDelete(generics.DestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ToDo.objects.filter(auther=user)