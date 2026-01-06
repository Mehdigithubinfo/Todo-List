import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: true },
    { id: 2, title: 'Build Todo App', completed: false },
    { id: 3, title: 'Test App', completed: true },
    { id: 4, title: 'Run App', completed: false },
    { id: 5, title: 'Sale App', completed: true },
  ];

  getTodos(): Todo[] {
    return this.todos;
  }
}
