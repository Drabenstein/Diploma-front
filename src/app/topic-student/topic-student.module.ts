import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicStudentRoutingModule } from './topic-student-routing.module';
import { StudentThesisComponent } from './student-thesis/student-thesis.component';


@NgModule({
  declarations: [
    StudentThesisComponent
  ],
  imports: [
    CommonModule,
    TopicStudentRoutingModule
  ]
})
export class TopicStudentModule { }
