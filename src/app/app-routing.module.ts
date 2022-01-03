import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { NonExistingPageComponent } from './shared/non-existing-page/non-existing-page.component';

const routes: Routes = [
  {
    path: 'approval',
    loadChildren: () =>
      import('./topic-approval/topic-approval.module').then(
        (m) => m.TopicApprovalModule
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./topic-list/topic-list.module').then((m) => m.TopicListModule),
  },
  {
    path: 'review-assigments',
    loadChildren: () =>
      import('./topic-review-assigment/topic-review-assigment.module').then(
        (m) => m.TopicReviewAssigmentModule
      ),
  },
  {
    path: 'reviewer',
    loadChildren: () =>
      import('./topic-reviewer/topic-reviewer.module').then(
        (m) => m.TopicReviewerModule
      ),
  },
  {
    path: 'thesis',
    loadChildren: () =>
      import('./topic-student/topic-student.module').then(
        (m) => m.TopicStudentModule
      ),
  },
  {
    path: 'supervisor',
    loadChildren: () =>
      import('./topic-supervisor/topic-supervisor.module').then(
        (m) => m.TopicSupervisorModule
      ),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: '404', component: NonExistingPageComponent },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
