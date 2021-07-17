import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterTaskDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterTaskDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  async deleteTask(taskId: string): Promise<void> {
    const result = await this.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
  }
}
