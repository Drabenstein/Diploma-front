import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicApprovalComponent } from './topic-approval/topic-approval.component';

const routes: Routes = [{ path: '', component: TopicApprovalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicApprovalRoutingModule {}
