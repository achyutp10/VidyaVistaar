# Generated by Django 5.1 on 2024-10-07 09:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("teacher_app", "0001_initial"),
        ("userauths_app", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="teacher",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="teacher",
            name="user_profile",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="userprofile",
                to="userauths_app.userprofile",
            ),
        ),
    ]
