import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDeclarationComponent } from './student-declaration/student-declaration.component';
import { StudentThesisComponent } from './student-thesis/student-thesis.component';

const routes: Routes = [
  { path: 'declaration', component: StudentDeclarationComponent },

  { path: '', component: StudentThesisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicStudentRoutingModule {}
