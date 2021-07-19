import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards, Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateStatus } from './dto/update-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterTaskDto: GetTaskFilterDto, @Req() req): Promise<Task[]> {
    this.logger.verbose(`User ${req.user.username} retrieving all tasks`)
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
