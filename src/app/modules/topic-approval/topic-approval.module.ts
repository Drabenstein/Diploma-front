import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicApprovalRoutingModule } from './topic-approval-routing.module';
import { TopicApprovalComponent } from './topic-approval/topic-approval.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TopicApprovalComponent
  ],
  imports: [
    CommonModule,
    TopicApprovalRoutingModule,
    SharedModule
  ]
})
export class TopicApprovalModule { }
