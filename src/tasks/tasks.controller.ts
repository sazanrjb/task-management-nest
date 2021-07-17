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
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateStatus } from './dto/update-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTaskDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterTaskDto).length) {
      return this.taskService.getTasksWithFilter(filterTaskDto);
    }

    return this.taskService.getAllTasks();
  }

  //   @Post()
  //   createTask(@Body() body) {
  //     console.log(body);
  //   }

  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     return this.taskService.createTask(title, description);
  //   }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:taskId')
  getTaskById(@Param('taskId') taskId): Task {
    return this.taskService.getTaskById(taskId);
  }

  @Delete('/:taskId')
  deleteTask(@Param('taskId') taskId: string): void {
    console.log(taskId);
    this.taskService.deleteTask(taskId);
  }

  @Patch('/:taskId/status')
  updateTaskStatus(
    @Param('taskId') taskId: string,
    @Body() updateStatus: UpdateStatus,
  ): Task {
    const status = updateStatus.status;
    return this.taskService.updateStatus(taskId, status);
  }
}
