import { Component } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  projectResponse: any = {};
  projectData: any = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.GetProjectList();
  }

  GetProjectList() {
    this.projectService.GetProjectListApi().subscribe({
      next: (response: any) => {
        if (response && response.status == 200 && response.err == 0) {
          this.projectResponse = response;
          if (
            this.projectResponse &&
            this.projectResponse.data &&
            this.projectResponse.data.length
          ) {
            this.projectData = this.projectResponse.data;
          }
        } else {
          this.projectData = [];
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  UpdateProject(project_id: any) {
    this.router.navigateByUrl(`/project/update/${project_id}`);
  }

  DeleteProject(project_id: string) {
    this.projectService.DeleteProjectApi(project_id).subscribe({
      next: (response: any) => {
        if (response && response.status == 200 && response.err == 0) {
          this.GetProjectList();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  TodoList(project_id: string) {
    this.router.navigateByUrl(`/todo/list/${project_id}`);
  }
}
