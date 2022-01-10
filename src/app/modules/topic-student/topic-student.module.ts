import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicStudentRoutingModule } from './topic-student-routing.module';
import { StudentThesisComponent } from './student-thesis/student-thesis.component';
import { StudentDeclarationComponent } from './student-declaration/student-declaration.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StudentThesisComponent,
    StudentDeclarationComponent
  ],
  imports: [
    CommonModule,
    TopicStudentRoutingModule,
    SharedModule
  ]
})
export class TopicStudentModule { }
