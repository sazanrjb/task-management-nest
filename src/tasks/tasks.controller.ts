import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateStatus } from './dto/update-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTaskDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterTaskDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:taskId')
  getTaskById(@Param('taskId') taskId: string): Promise<Task> {
    return this.taskService.getTaskById(taskId);
  }

  @Delete('/:taskId')
  deleteTask(@Param('taskId') taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  @Patch('/:taskId/status')
  updateTaskStatus(
    @Param('taskId') taskId: string,
    @Body() updateStatus: UpdateStatus,
  ): Promise<Task> {
    const status = updateStatus.status;
    return this.taskService.updateStatus(taskId, status);
  }
}
