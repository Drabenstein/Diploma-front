import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicSupervisorRoutingModule } from './topic-supervisor-routing.module';
import { SupervisorTopicListComponent } from './supervisor-topic-list/supervisor-topic-list.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { SharedModule } from '../shared/shared.module';
import { TopicApplicationCandidatesComponent } from './topic-application-candidates/topic-application-candidates.component';
import { TopicSupervisorApplicationComponent } from './topic-supervisor-application/topic-supervisor-application.component';


@NgModule({
  declarations: [
    SupervisorTopicListComponent,
    TopicCreateComponent,
    CandidatesListComponent,
    TopicApplicationCandidatesComponent,
    TopicSupervisorApplicationComponent
  ],
  imports: [
    CommonModule,
    TopicSupervisorRoutingModule,
    SharedModule
  ]
})
export class TopicSupervisorModule { }
