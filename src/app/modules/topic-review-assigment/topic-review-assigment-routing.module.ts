import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewAssigmentComponent } from './review-assigment/review-assigment.component';
import { ReviewerListComponent } from './reviewer-list/reviewer-list.component';

const routes: Routes = [
  { path: 'list', component: ReviewerListComponent },

  { path: '', component: ReviewAssigmentComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicReviewAssigmentRoutingModule {}
