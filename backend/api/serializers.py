from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ToDo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id', 'content', 'auther', 'created_at']
        read_only_fields = ['auther', 'created_at']