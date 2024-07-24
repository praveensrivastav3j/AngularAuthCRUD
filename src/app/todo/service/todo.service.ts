import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  // http://13.233.233.61:5000/todo/list/:projectId
  GetTodoListApi(projectId: any) {
    return this.httpClient.get(
      `${environment.base_url}/todo/list/${projectId}`
    );
  }

  // http://13.233.233.61:5000/todo/:todoId
  GetSingleTodoApi(todoId: string) {
    return this.httpClient.get(`${environment.base_url}/todo/${todoId}`);
  }

  // http://13.233.233.61:5000/todo/save/:projectId
  AddUpdateTodo(projectId: any, todoData: any) {
    return this.httpClient.post(
      `${environment.base_url}/todo/save/${projectId}`,
      todoData
    );
  }

  // http://13.233.233.61:5000/todo/delete/:todoId
  DeleteTodoApi(todoId: any) {
    return this.httpClient.delete(
      `${environment.base_url}/todo/delete/${todoId}`
    );
  }
}
