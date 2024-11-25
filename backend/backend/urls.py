"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from todoperceptron.views import (
    index, get_all_tasks, manage_task, create_task, 
    get_all_epics, create_epic, manage_epic, new_task_for_epic,
    get_dashboard_info, get_recent_pending_tasks
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", index),
    path("tasks/", get_all_tasks),
    path("tasks/<int:task_id>/", manage_task),
    path("new-task/", create_task),
    path("epics/", get_all_epics),
    path("new-epic/", create_epic),
    path("epics/<int:epic_id>/", manage_epic),
    path("epics/<int:epic_id>/new-task/", new_task_for_epic),
    path("dashboard-info/", get_dashboard_info),
    path("recent-pending-tasks/", get_recent_pending_tasks),
]
