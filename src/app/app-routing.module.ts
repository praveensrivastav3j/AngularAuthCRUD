import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { authGuard } from './core/guard/auth.guard';
import { TodoModule } from './todo/todo.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'project',
        loadChildren: () => ProjectModule,
      },
      {
        path:'todo',
        loadChildren: ()=>TodoModule
      },
      {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
