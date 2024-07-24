import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  project_id: string = '';
  todo_id: string = '';

  singleTodoData: any = {};

  todoForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.todoForm = formBuilder.group({
      todoName: ['', []],
      _id: [''],
    });
  }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params);
    if (this.activatedRoute.snapshot.params['project_id']) {
      this.project_id = this.activatedRoute.snapshot.params['project_id'];
    } else if (this.activatedRoute.snapshot.params['todoId']) {
      this.todo_id = this.activatedRoute.snapshot.params['todoId'];
      this.GetSingleTodo();
    }
  }

  GetSingleTodo() {
    this.todoService.GetSingleTodoApi(this.todo_id).subscribe({
      next: (response: any) => {
        if (response && response.status == 200 && response.err == 0) {
          this.singleTodoData = response.data;
          this.todoForm.patchValue({
            todoName:this.singleTodoData.todoName,
            _id:this.singleTodoData._id,
          });
          this.project_id = this.singleTodoData.projectId;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  SubmitTodo() {
    this.todoService
      .AddUpdateTodo(this.project_id, this.todoForm.value)
      .subscribe({
        next: (response: any) => {
          if (response && response.status == 200 && response.err == 0) {
            this.todoForm.reset();
            this.router.navigateByUrl(`/todo/list/${this.project_id}`);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
