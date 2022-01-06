import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicReviewAssigmentRoutingModule } from './topic-review-assigment-routing.module';
import { ReviewAssigmentComponent } from './review-assigment/review-assigment.component';
import { ReviewerListComponent } from './reviewer-list/reviewer-list.component';


@NgModule({
  declarations: [
    ReviewAssigmentComponent,
    ReviewerListComponent
  ],
  imports: [
    CommonModule,
    TopicReviewAssigmentRoutingModule
  ]
})
export class TopicReviewAssigmentModule { }
