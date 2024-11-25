from rest_framework import serializers
from .models import Task, Epic

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'status', 'completed', 'created_at', 'updated_at')


class EpicSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Epic
        fields = ('id', 'title', 'tasks', 'created_at', 'updated_at')