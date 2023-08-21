import { Component, Host, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoDataService, TodoItem } from './todo-data.service';

const LOCAL_STORAGE_TODO_KEY = 'todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('window:onbeforeunload')
  beforeUnload() {
    const todos = JSON.stringify(this.todoDataService.getTodoList());
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, todos);
  }

  @HostListener('window:onbeforeload')
  beforeLoad() {
    const todos = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);
    if (todos) {
      (JSON.parse(todos) as TodoItem[])
        .forEach(task => this.todoDataService.addTodoItem({ name: task.name }));
    }
  }

  title = 'Todo App';

  constructor(
    private todoDataService: TodoDataService
  ) { }
}
