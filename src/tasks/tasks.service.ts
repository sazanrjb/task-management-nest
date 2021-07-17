import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterTaskDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterTaskDto);
  }

  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterTaskDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterTaskDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(taskId: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(taskId);

    if (!found) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return found;
  }

  deleteTask(taskId: string): void {
    this.tasksRepository.deleteTask(taskId);
  }

  async updateStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
