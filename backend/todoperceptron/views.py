from django.shortcuts import render
from django.db.models import Q
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Task, Epic
from .serializers import TaskSerializer, EpicSerializer

from datetime import timedelta
# Create your views here.

@api_view()
def index(request):
    return Response({"message": "Hello, world!"})

@api_view()
def get_all_tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_task(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    
    return Response(serializer.errors, status=400)

@api_view(['GET', 'DELETE', 'PATCH'])
def manage_task(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return Response({"message": "Task not found"}, status=404)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        task.delete()
        return Response({"message": "Task deleted"})
    
    elif request.method == 'PATCH':
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
@api_view()
def get_all_epics(request):
    epics = Epic.objects.all()
    serializer = EpicSerializer(epics, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_epic(request):
    taskIds = request.data.pop('tasks')
    tasksInEpic = [Task.objects.get(id=taskId) for taskId in taskIds]
    
    newEpic = Epic.objects.create(**request.data)
    newEpic.tasks.set(tasksInEpic)
    serializer = EpicSerializer(newEpic)

    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PATCH'])
def manage_epic(request, epic_id):
    try:
        epic = Epic.objects.get(id=epic_id)
    except Epic.DoesNotExist:
        return Response({"message": "Epic not found"}, status=404)

    if request.method == 'GET':
        serializer = EpicSerializer(epic)
        tasks = epic.tasks.all()
        total_tasks = len(tasks)
        completed = tasks.filter(completed=True)
        completed_tasks = len(completed)

        return Response({"epic": serializer.data, "total_tasks": total_tasks, "completed_tasks": completed_tasks})
    
    elif request.method == 'DELETE':
        epic.delete()
        return Response({"message": "Epic deleted"})
    
    elif request.method == 'PATCH':
        # epic.tasks.remove()
        tasks = request.data.pop('tasks')
        tasks = [Task.objects.get(id=task['id']) for task in tasks]
        epic.tasks.set(tasks)
        serializer = EpicSerializer(epic)
        total_tasks, completed_tasks = get_completed_tasks(epic)
        return Response({"epic": serializer.data, "total_tasks": total_tasks, "completed_tasks": completed_tasks})

@api_view(['POST'])
def new_task_for_epic(request, epic_id):
    try:
        epic = Epic.objects.get(id=epic_id)
    except Epic.DoesNotExist:
        return Response({"message": "Epic not found"}, status=404)

    task = Task.objects.create(**request.data)
    epic.tasks.add(task)
    serializer = TaskSerializer(task)
    total_tasks, completed_tasks = get_completed_tasks(epic)
    return Response({"new_task": serializer.data, "total_tasks": total_tasks, "completed_tasks": completed_tasks}, status=201)


@api_view(['GET'])
def get_dashboard_info(request):
    in_progress_tasks = len(Task.objects.all().filter(status="in-progress"))
    to_do_tasks = len(Task.objects.all().filter(status="to-do"))
    done_tasks = len(Task.objects.all().filter(status="done"))
    block_tasks = len(Task.objects.all().filter(status="block"))

    if in_progress_tasks + to_do_tasks + done_tasks + block_tasks == 0:
        return Response({"message": "No tasks found"})

    return Response([
        { "name": "In Progress", "value": in_progress_tasks },
        { "name": "To Do", "value": to_do_tasks },
        { "name": "Done", "value": done_tasks },
        { "name": "Block", "value": block_tasks }
    ])

@api_view()
def get_recent_pending_tasks(request):
    ## get tasks from last 2 days
    query = Q(created_at__gte=timezone.now()-timedelta(days=2))
    query.add(Q(completed=False), Q.AND)

    pending_tasks = Task.objects.filter(query)
    serializer = TaskSerializer(pending_tasks, many=True)
    return Response(serializer.data)


## metodos de ayuda
def get_completed_tasks(epic: Epic):
    tasks = epic.tasks.all()    
    completed = [task for task in tasks if task.completed]
    total_tasks = len(tasks)
    completed_tasks = len(completed)
    return total_tasks, completed_tasks