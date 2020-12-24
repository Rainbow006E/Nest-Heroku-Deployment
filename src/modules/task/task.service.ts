import { Injectable, NotFoundException } from '@nestjs/common';
import moment from 'moment';
import { CreateTask } from './dto/createTask.dto';
import { Task } from './dto/task.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    createTask(createTask: CreateTask): Task {
        const { title, description } = createTask;

        const newTask: Task = {
            id: uuid(),
            title,
            description,
            dateTimeCreated: moment().format(),
        }

        this.tasks.push(newTask);

        return newTask;
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    getTask(taskId: string): Task {
        const task = this.tasks.find(task => task.id === taskId);

        if (!task) {
            throw new NotFoundException('Task with ID ${taskId} not found')
        }

        return task;
    }
}
