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
  todos = signal<Todo[]>([]);

  // Signal for new todo input
  newTodo = signal('');

  // Computed signals for derived state
  completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length
  );

  workingCount = computed(
    () => this.todos().filter((todo) => !todo.completed).length
  );

  // ✅ اضافه کردن progressPercentage
  progressPercentage = computed(() => {
    const total = this.todos().length;
    const completed = this.completedCount();

    // جلوگیری از تقسیم بر صفر
    if (total === 0) {
      return 0;
    }

    // محاسبه درصد
    return Math.round((completed / total) * 100);
  });

  // ✅ برای نمایش گرافیکی progress bar
  progressBarWidth = computed(() => `${this.progressPercentage()}%`);

  // ✅ وضعیت بر اساس درصد
  progressStatus = computed(() => {
    const percentage = this.progressPercentage();

    if (percentage === 0) {
      return 'not-started';
    } else if (percentage < 50) {
      return 'in-progress';
    } else if (percentage < 100) {
      return 'almost-done';
    } else {
      return 'completed';
    }
  });

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
        id: Date.now(),
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
