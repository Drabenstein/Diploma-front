import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicReviewerRoutingModule } from './topic-reviewer-routing.module';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ReviewListComponent,
    ReviewFormComponent
  ],
  imports: [
    CommonModule,
    TopicReviewerRoutingModule,
    SharedModule,
  ]
})
export class TopicReviewerModule { }
