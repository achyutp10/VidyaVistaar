from django.apps import AppConfig


class UserauthsAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "userauths_app"

    # def ready(self):
    #     import userauths_app.signals 