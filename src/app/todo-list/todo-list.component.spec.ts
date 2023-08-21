import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoDataService } from '../todo-data.service';

import { MatDialogModule } from '@angular/material/dialog';

import { TestbedHarnessEnvironment, } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoDataService;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TodoListComponent],
      providers: [
        MatDialogModule,
        TodoListComponent,
        TodoDataService
      ]
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoService = TestBed.inject(TodoDataService);

    // puts harness loader at root of documents
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get todo list from service', () => {
    expect(component.todoList).toEqual(todoService.getTodoList());
  });

  it('should open dialog on open', async () => {
    component.addItem({ id: 'todo-item' });
    const dialogs = await loader.getAllHarnesses(
      MatDialogHarness.with({ selector: '#todo-item' })
    );
    expect(dialogs.length).toBe(1);
  });

  // DOM testing
  it('should should show item lists if there is any', () => {
    const initial = fixture.nativeElement as HTMLElement;

    expect(initial.querySelector('.empty > *')?.innerHTML.toLowerCase())
      .withContext('Empty list')
      .toContain('no tasks');

    expect(initial.querySelector('.todo-list'))
      .withContext('List without task')
      .toBeFalsy();

    ['task1', 'task2', 'task3']
      .forEach(name => todoService.addTodoItem({ name }));

    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.empty')).toBeFalsy();
    expect(compiled.querySelectorAll('mat-list > mat-list-item').length)
      .withContext('List length')
      .toBe(todoService.getTodoList().length);
  });


  it('should have create todo button and opening dialog', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement | null;
    expect(button).toBeTruthy();
    button?.click();
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

  });

  it('should create item from dialog', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.click();
    expect((await loader.getAllHarnesses(MatDialogHarness)).length)
      .withContext('hanress created')
      .toBe(1);
    expect(document.querySelector('.container button')).toBeTruthy();
  });
});
