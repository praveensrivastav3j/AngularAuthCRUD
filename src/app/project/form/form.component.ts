import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  projectForm: FormGroup;

  signleProjectData: any = {};

  project_id: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.projectForm = formBuilder.group({
      projectName: ['', [Validators.required]],
      project_id: [''],
    });

    // Get _id from route
    if (this.activatedRoute.snapshot.params['id']) {
      this.project_id = this.activatedRoute.snapshot.params['id'];
      this.GetSingleProject();
    }
  }

  SubmitProject() {
    if (this.projectForm.valid) {
      this.projectService
        .AddUpdateProjectApi(this.projectForm.value)
        .subscribe({
          next: (response: any) => {
            if (response && response.status == 200 && response.err == 0) {
              this.projectForm.reset();
              this.router.navigateByUrl('/project/list');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    }
  }

  GetSingleProject() {
    this.projectService.GetSingleProjectApi(this.project_id).subscribe({
      next: (response: any) => {
        if (response && response.status == 200 && response.err == 0) {
          this.signleProjectData = response.data;
          this.projectForm.patchValue({
            projectName: this.signleProjectData.projectName,
            project_id: this.signleProjectData._id,
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
