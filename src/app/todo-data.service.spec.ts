import { TestBed } from '@angular/core/testing';

import { TodoDataService, TodoItem } from './todo-data.service';

describe('TodoDataService', () => {
  let service: TodoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoDataService);
  });

  function setupTask() {
    const tasks = [
      'Task 1',
      'Task 2',
      'Task 3'
    ];
    return tasks.map(name => service.addTodoItem({ name }));
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have empty todo list', () => {
    expect(service.getTodoList()).toEqual([]);
  });

  it('#addTodoItem should append an item at the end of list', () => {
    // get initial items length
    const currentItems = service.getTodoList().length;
    const todoItem: TodoItem = {
      name: 'Learn writing test cases...'
    }

    const newTask = service.addTodoItem(todoItem);
    const addedTaskIndex = service.getTodoList()
      .findIndex(task => task.name === todoItem.name);

    expect(service.getTodoList().length).toBe(currentItems + 1);
    expect(addedTaskIndex).toBeGreaterThan(-1);
    expect(newTask.taskId);
  });

  it('#removeTodoItem should remove an item from list', () => {
    const taskList = setupTask();
    const taskId = parseInt((Math.random() * taskList.length).toString());
    const removedTask: TodoItem | null = service.removeTodoItem(taskId);

    if (!removedTask) {
      expect(removedTask).toBeNull();
      return;
    }

    const idx = service.getTodoList()
      .findIndex(task => task.name == removedTask.name);

    expect(idx).withContext('Task should not be in list').toBe(-1);
    expect(service.removeTodoItem(idx))
      .withContext('Should throw error on passing invalid taskId')
      .toBeNull();
  });

  it('#updateTodoItem should update items', () => {
    const taskId = setupTask()[0].taskId;
    if (!taskId) { return; }
    const newTask = 'New task specifications...';
    const updatedTask: TodoItem | null = service.updateTodoItem(taskId, newTask);
    if (!updatedTask) return;
    expect(updatedTask.name).toEqual(newTask);
    expect(service.updateTodoItem(999, newTask))
      .withContext('With invalid taskId')
      .toBeNull();
    const t = service.getTodoList().find(task => task.taskId == taskId);
    if (!t) { return; }
    expect(t.name).toEqual(newTask);
  });

});

