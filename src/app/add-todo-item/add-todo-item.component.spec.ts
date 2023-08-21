import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoItemComponent } from './add-todo-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { TodoDataService } from '../todo-data.service';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddTodoItemComponent', () => {
  let component: AddTodoItemComponent;
  let fixture: ComponentFixture<AddTodoItemComponent>;
  let loader: HarnessLoader;
  let todoService: TodoDataService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddTodoItemComponent, NoopAnimationsModule],
      providers: [TodoDataService, { provide: MatDialogRef, useValue: {} }]
    });
    fixture = TestBed.createComponent(AddTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    todoService = TestBed.inject(TodoDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input for task name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  });

  it('mat form field', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness);
    expect(await formField.getControl() instanceof MatInputHarness)
      .withContext('is mat input')
      .toBe(true);
    expect((await formField.getTextErrors()).length)
      .withContext('Untouched error')
      .toBeFalsy();
    await (await formField.getControl() as MatInputHarness).blur();
    expect((await formField.getTextErrors()).length)
      .withContext('error length')
      .toBe(1);
  });

  it('should be able to check if form field is invalid', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness);
    expect(await formField.isControlValid())
      .withContext('With empty string')
      .toBe(false);
    component.name.setValue('Name');
    expect(await formField.isControlValid()).toBe(true);
  });

  it('submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('button').length).toBe(2);
    expect(
      (compiled.querySelector('button[type=submit]') as HTMLButtonElement)?.disabled
    ).toBeTruthy();
    component.name.setValue('Name');
    fixture.detectChanges();
    expect(compiled.querySelector('button')?.disabled).toBeFalsy();
  });

});
