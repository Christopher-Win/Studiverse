# Generated by Django 5.0.8 on 2024-08-28 17:46

import django.contrib.postgres.indexes
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0006_alter_user_email"),
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.AddIndex(
            model_name="user",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["username"], name="username_gin_idx", opclasses=["gin_trgm_ops"]
            ),
        ),
        migrations.AddIndex(
            model_name="user",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["netID"], name="netid_gin_idx", opclasses=["gin_trgm_ops"]
            ),
        ),
        migrations.AddIndex(
            model_name="user",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["first_name"],
                name="firstname_gin_idx",
                opclasses=["gin_trgm_ops"],
            ),
        ),
        migrations.AddIndex(
            model_name="user",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["last_name"],
                name="lastname_gin_idx",
                opclasses=["gin_trgm_ops"],
            ),
        ),
    ]