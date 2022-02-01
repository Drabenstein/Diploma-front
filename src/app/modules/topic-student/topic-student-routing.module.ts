import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDeclarationComponent } from './student-declaration/student-declaration.component';
import { StudentThesisMainComponent } from './student-thesis-main/student-thesis-main.component';
import { StudentThesisReviewComponent } from './student-thesis-review/student-thesis-review.component';
import { StudentThesisComponent } from './student-thesis/student-thesis.component';

const routes: Routes = [
  { path: 'declaration', component: StudentDeclarationComponent },
  { path: 'review/:thesisId/:reviewId', component: StudentThesisReviewComponent },
  { path: ':thesisId', component: StudentThesisComponent },
  { path: '', component: StudentThesisMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicStudentRoutingModule {}
