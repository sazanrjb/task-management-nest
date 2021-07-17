import { TaskStatus } from '../tasks.model';
import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
