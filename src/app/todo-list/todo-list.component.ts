import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDataService, TodoItem } from '../todo-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AddTodoItemComponent } from '../add-todo-item/add-todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: TodoItem[] = [];

  constructor(
    private todoService: TodoDataService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
  }

  addItem(config?: MatDialogConfig) {
    this.dialog.open(AddTodoItemComponent, config)
      .afterClosed()
      .subscribe(name => {
        name && this.todoService.addTodoItem({ name });
      });
  }

  deleteItem(index: number) {
    this.todoService.removeTodoItem(index);
  }

}
