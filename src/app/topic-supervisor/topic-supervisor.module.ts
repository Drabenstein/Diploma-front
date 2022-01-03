import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicSupervisorRoutingModule } from './topic-supervisor-routing.module';
import { SupervisorTopicListComponent } from './supervisor-topic-list/supervisor-topic-list.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';


@NgModule({
  declarations: [
    SupervisorTopicListComponent,
    TopicCreateComponent
  ],
  imports: [
    CommonModule,
    TopicSupervisorRoutingModule
  ]
})
export class TopicSupervisorModule { }
