import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  project_id: string = '';
  todoList:any =[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.project_id = this.activatedRoute.snapshot.params['project_id'];
    this.GetTodos();
  }

  GetTodos() {
    this.todoService.GetTodoListApi(this.project_id).subscribe({
      next: (response: any) => {
        if (response && response.status == 200 && response.err == 0) {
          this.todoList = response.data
        } else {
          this.todoList = [];
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  DeleteTodo(todo_id:string){
    this.todoService.DeleteTodoApi(todo_id).subscribe({
      next: (response: any) => {
        if (response && response.status == 200 && response.err == 0) {
          this.GetTodos();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
