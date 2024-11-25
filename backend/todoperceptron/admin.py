from django.contrib import admin
from .models import Task, Epic

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'completed', 'created_at', 'updated_at')


class EpicAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
# Register your models here.

admin.site.register(Task, TaskAdmin)
admin.site.register(Epic, EpicAdmin)