from django.db import models

# Create your models here.

class Status(models.TextChoices):
    IN_PROGRESS = "in-progress", "In Progress"
    DONE = "done", "Done"
    TODO = "to-do", "To Do"
    BLOCK = "block", "Block"

class Task(models.Model):
    title = models.CharField(max_length=200)
    status = models.CharField(
        max_length=12,
        choices=Status.choices,
        default=Status.TODO,
    )
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if self.status == Status.DONE:
            self.completed = True
        else:
            self.completed = False
        super().save(*args, **kwargs)

    def _str_(self):
        return self.title
    
class Epic(models.Model):
    title = models.CharField(max_length=200)
    tasks = models.ManyToManyField(Task)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def _str_(self):
        return self.title