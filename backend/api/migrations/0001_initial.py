# Generated by Django 5.0.6 on 2024-06-22 04:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('auther', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='todo', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
