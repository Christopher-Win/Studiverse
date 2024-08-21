# Generated by Django 5.0.8 on 2024-08-07 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="gpa",
            field=models.FloatField(max_length=4),
        ),
        migrations.AlterField(
            model_name="user",
            name="year_in_school",
            field=models.CharField(
                choices=[
                    ("FR", "Freshman"),
                    ("SO", "Sophomore"),
                    ("JR", "Junior"),
                    ("SR", "Senior"),
                    ("GR", "Graduate"),
                ],
                default="FR",
                max_length=10,
            ),
        ),
    ]