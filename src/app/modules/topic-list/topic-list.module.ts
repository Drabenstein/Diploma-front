import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicListRoutingModule } from './topic-list-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicApplicationComponent } from './topic-application/topic-application.component';
import { TopicProposeComponent } from './topic-propose/topic-propose.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TopicListComponent,
    TopicApplicationComponent,
    TopicProposeComponent
  ],
  imports: [
    CommonModule,
    TopicListRoutingModule,
    SharedModule,
  ]
})
export class TopicListModule { }
