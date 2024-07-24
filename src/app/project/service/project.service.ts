import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  // http://13.233.233.61:5000/project/list
  GetProjectListApi() {
    return this.httpClient.get(`${environment.base_url}/project/list`);
  }

  // http://13.233.233.61:5000/project/:id
  GetSingleProjectApi(project_id: string) {
    return this.httpClient.get(`${environment.base_url}/project/${project_id}`);
  }

  // http://13.233.233.61:5000/project/save
  AddUpdateProjectApi(projectData: any) {
    return this.httpClient.post(
      `${environment.base_url}/project/save`,
      projectData
    );
  }

  // http://13.233.233.61:5000/project/:id
  DeleteProjectApi(project_id: string) {
    return this.httpClient.delete(`${environment.base_url}/project/${project_id}`);
  }
}
