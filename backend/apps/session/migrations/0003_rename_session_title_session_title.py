# Generated by Django 5.0.8 on 2024-08-12 17:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("session", "0002_alter_session_participants"),
    ]

    operations = [
        migrations.RenameField(
            model_name="session",
            old_name="session_title",
            new_name="title",
        ),
    ]
