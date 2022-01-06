import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicSupervisorRoutingModule } from './topic-supervisor-routing.module';
import { SupervisorTopicListComponent } from './supervisor-topic-list/supervisor-topic-list.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';


@NgModule({
  declarations: [
    SupervisorTopicListComponent,
    TopicCreateComponent,
    CandidatesListComponent
  ],
  imports: [
    CommonModule,
    TopicSupervisorRoutingModule
  ]
})
export class TopicSupervisorModule { }
