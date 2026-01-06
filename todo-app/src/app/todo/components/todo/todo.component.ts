import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { Todo } from '../../models/todo.model';
@Component({
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  // Using signals for reactive state management
  todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular 20', completed: true },
    { id: 2, title: 'Build Todo App', completed: false },
  ]);

  // Signal for new todo input
  newTodo = signal('');

  // Computed signals for derived state
  completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length
  );

  pendingCount = computed(
    () => this.todos().filter((todo) => !todo.completed).length
  );

  // Update the newTodo signal
  updateNewTodo(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.newTodo.set(value);
  }

  // Add todo using signals
  addTodo(): void {
    const title = this.newTodo().trim();
    if (title) {
      const newTodo: Todo = {
        id: this.todos().length + 1,
        title: title,
        completed: false,
      };

      // Update todos signal immutably
      this.todos.update((currentTodos) => [...currentTodos, newTodo]);

      // Reset input
      this.newTodo.set('');
    }
  }

  // Toggle todo completion
  toggleTodo(id: number): void {
    this.todos.update((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Delete todo
  deleteTodo(id: number): void {
    this.todos.update((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }
}
