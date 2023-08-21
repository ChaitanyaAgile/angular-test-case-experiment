import { Injectable } from '@angular/core';

export type TaskId = number;

export interface TodoItem {
  taskId?: TaskId,
  name: string,
  completed?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  private todoList: TodoItem[] = [];

  constructor() { }

  addTodoItem(todoItem: TodoItem) {
    const maxTaskId = this.todoList.map(task => task.taskId).sort().pop() || 0;
    const payload: TodoItem = {
      taskId: maxTaskId + 1,
      name: todoItem.name
    };

    this.todoList.push(payload);
    return this.todoList[this.todoList.length - 1];
  }

  getTodoList(): TodoItem[] {
    return this.todoList;
  }

  removeTodoItem(taskId: number): TodoItem | null {
    const taskIndex = this.todoList.findIndex(task => task.taskId == taskId);
    if (taskIndex < 0) { return null; }
    const [removedTask] = this.todoList.splice(taskIndex, 1);
    return removedTask;
  }

  updateTodoItem(taskId: TaskId, taskDetails: string) {
    const taskIdx = this.todoList.findIndex(task => task.taskId == taskId);
    if (taskIdx < 0) { return null; }
    const task = this.todoList[taskIdx];
    task.name = taskDetails;

    // because objects are arrays are passed by reference
    return task;
  }
}

