from django.contrib import admin

from userauths_app.models import User, UserProfile, Role, UserRole
from teacher_app.models import Teacher

class UserAdmin(admin.ModelAdmin):
  # list_display = ('full_name', 'email', 'phone')
  # # list_editable = ['phone']
  # search_fields = ['full_name']
  # list_filter = ['phone']
  readonly_fields = ('password',)

admin.site.register(User, UserAdmin)
admin.site.register(UserProfile)
admin.site.register(Role)
admin.site.register(UserRole)
admin.site.register(Teacher)