import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule], // List of modules required by this module. Any exported provider by these modules will be available in this module via DI.
  controllers: [], 
  providers: [],
})
export class AppModule {}
