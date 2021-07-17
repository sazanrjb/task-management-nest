import { TaskStatus } from '../tasks.model';
import { IsEnum } from 'class-validator';

export class UpdateStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
