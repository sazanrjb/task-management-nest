import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterTaskDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterTaskDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(taskId: string): Task {
    const found = this.tasks.find(task => task.id === taskId);

    if (!found) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return found;
  }

  deleteTask(taskId: string): void {
    const task = this.getTaskById(taskId);

    this.tasks.filter(task => task.id !== taskId);
  }

  updateStatus(taskId: string, status: string): Task {
    const task = this.getTaskById(taskId);

    task.status = TaskStatus[status];

    return task;
  }
}
