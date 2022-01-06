import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewListComponent } from './review-list/review-list.component';

const routes: Routes = [
  { path: 'thesis/:id', component: ReviewFormComponent },

  { path: '', component: ReviewListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicReviewerRoutingModule {}
