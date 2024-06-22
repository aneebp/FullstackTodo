from django.urls import path
from . import views
urlpatterns = [
    path('todo/',views.todolistCreate.as_view(),name="todolist"),
    path('todo/delete/<int:pk>/',views.todolistDelete.as_view(),name="tododelete"),
]
