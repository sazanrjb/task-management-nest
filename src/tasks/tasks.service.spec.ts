import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn()
});


const mockUser = {
  username: 'Test',
  id: '123',
  password: 'Test',
  tasks: []
}

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = module.get(TasksService);
    taskRepository = module.get(TasksRepository);
  });


  describe('getTasks', () => {
    it('calls TasksRespository.getTasks and returns the result', async () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      taskRepository.getTasks.mockResolvedValue('test');

      // call getTasks
      const result = await taskService.getTasks(null);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('test');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRespository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Title',
        description: 'Description',
        id: '123',
        status: TaskStatus.OPEN
      }

      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await taskService.getTaskById('someId');

      expect(result).toEqual(mockTask);
    });

    it('calls TasksRespository.findOne and handles and error', async () => {
      taskRepository.findOne.mockResolvedValue(null);

      expect(taskService.getTaskById('someId')).rejects.toThrow(NotFoundException);
    });
  });
});