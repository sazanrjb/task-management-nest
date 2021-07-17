import { TaskStatus } from '../task-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
