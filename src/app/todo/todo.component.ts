import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { ITodo } from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent implements OnInit {
  todos: ITodo[] = [];
  isLoading: boolean = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.firestoreCollection
      .valueChanges({ idField: 'id' })
      .subscribe((items) => {
        this.todos = (items as ITodo[]).sort(
          (a, b) => (a.isDone as any) - (b.isDone as any)
        );
        this.isLoading = false;
      });
  }

  onClick(input: HTMLInputElement) {
    const { value } = input;
    if (value) {
      this.todoService.addTodo(value);
      input.value = '';
    }
  }

  onKeyPress(event: KeyboardEvent, input: HTMLInputElement) {
    if (event.key === 'Enter') {
      this.onClick(input);
    }
  }

  onChangeStatus(id: string, status: boolean) {
    this.todoService.updateTodoStatus(id, status);
  }

  onDeleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }
}
