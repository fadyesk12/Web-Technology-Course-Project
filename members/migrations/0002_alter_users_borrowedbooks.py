# Generated by Django 5.0.6 on 2024-05-23 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='borrowedBooks',
            field=models.TextField(max_length=255, null=True),
        ),
    ]
