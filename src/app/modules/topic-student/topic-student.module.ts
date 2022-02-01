import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicStudentRoutingModule } from './topic-student-routing.module';
import { StudentThesisComponent } from './student-thesis/student-thesis.component';
import { StudentDeclarationComponent } from './student-declaration/student-declaration.component';
import { SharedModule } from '../shared/shared.module';
import { StudentThesisReviewComponent } from './student-thesis-review/student-thesis-review.component';
import { StudentThesisMainComponent } from './student-thesis-main/student-thesis-main.component';


@NgModule({
  declarations: [
    StudentThesisComponent,
    StudentDeclarationComponent,
    StudentThesisReviewComponent,
    StudentThesisMainComponent
  ],
  imports: [
    CommonModule,
    TopicStudentRoutingModule,
    SharedModule
  ]
})
export class TopicStudentModule { }
