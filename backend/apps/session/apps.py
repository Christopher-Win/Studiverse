from django.apps import AppConfig


class SessionConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.session"

    def ready(self):
        import apps.session.signals