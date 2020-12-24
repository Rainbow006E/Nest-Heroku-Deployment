import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTask } from './dto/createTask.dto';
import { Task } from './dto/task.dto';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    getTasks(): Task[] {
        return this.taskService.getTasks();
    }

    @ApiCreatedResponse()
    @ApiOkResponse({
        description: 'Retrived task by ID successfully',
        type: Task
    })
    @ApiNotFoundResponse({ description: 'No task found for ID' })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
    })
    @Get(':id')
    getTask(@Param('id') taskId: string): Task {
        return this.taskService.getTask(taskId);
    }

    @Post()
    createTask(@Body() createTask: CreateTask): Task {
        return this.taskService.createTask(createTask);
    }
}
