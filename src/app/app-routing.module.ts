import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProgramCommitteeGuard } from './guards/program-committee.guard';
import { StudentGuard } from './guards/student.guard';
import { TutorGuard } from './guards/tutor.guard';
import { ForbiddenPageComponent } from './modules/shared/forbidden-page/forbidden-page.component';
import { HomePageComponent } from './modules/shared/home-page/home-page.component';
import { NonExistingPageComponent } from './modules/shared/non-existing-page/non-existing-page.component';
import { UnauthorizedPageComponent } from './modules/shared/unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  {
    path: 'approval',
    canActivate: [ProgramCommitteeGuard],
    loadChildren: () =>
      import('./modules/topic-approval/topic-approval.module').then(
        (m) => m.TopicApprovalModule
      ),
  },
  {
    path: 'list',
    canActivate: [StudentGuard],
    loadChildren: () =>
      import('./modules/topic-list/topic-list.module').then(
        (m) => m.TopicListModule
      ),
  },
  {
    path: 'review-assigments',
    canActivate: [ProgramCommitteeGuard],
    loadChildren: () =>
      import(
        './modules/topic-review-assigment/topic-review-assigment.module'
      ).then((m) => m.TopicReviewAssigmentModule),
  },
  {
    path: 'reviewer',
    canActivate: [TutorGuard],
    loadChildren: () =>
      import('./modules/topic-reviewer/topic-reviewer.module').then(
        (m) => m.TopicReviewerModule
      ),
  },
  {
    path: 'thesis',
    canActivate: [StudentGuard],
    loadChildren: () =>
      import('./modules/topic-student/topic-student.module').then(
        (m) => m.TopicStudentModule
      ),
  },
  {
    path: 'supervisor',
    canActivate: [TutorGuard],
    loadChildren: () =>
      import('./modules/topic-supervisor/topic-supervisor.module').then(
        (m) => m.TopicSupervisorModule
      ),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  { path: '404', component: NonExistingPageComponent },
  { path: '403', component: ForbiddenPageComponent },
  { path: '401', component: UnauthorizedPageComponent },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
