# Generated by Django 4.0 on 2023-09-22 07:38

import core.user.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0004_alter_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to=core.user.models.user_directory_path),
        ),
    ]
