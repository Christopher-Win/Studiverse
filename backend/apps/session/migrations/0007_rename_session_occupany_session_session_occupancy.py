# Generated by Django 5.0.8 on 2024-11-18 22:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("session", "0006_alter_session_start_time"),
    ]

    operations = [
        migrations.RenameField(
            model_name="session",
            old_name="session_occupany",
            new_name="session_occupancy",
        ),
    ]
