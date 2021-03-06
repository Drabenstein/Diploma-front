import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicReviewAssigmentRoutingModule } from './topic-review-assigment-routing.module';
import { ReviewAssigmentComponent } from './review-assigment/review-assigment.component';
import { ReviewerListComponent } from './reviewer-list/reviewer-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ReviewAssigmentComponent,
    ReviewerListComponent
  ],
  imports: [
    CommonModule,
    TopicReviewAssigmentRoutingModule,
    SharedModule,
  ]
})
export class TopicReviewAssigmentModule { }
