import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])], // Inject repo any where in task module
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
