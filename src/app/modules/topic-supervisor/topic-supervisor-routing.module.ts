import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { SupervisorTopicListComponent } from './supervisor-topic-list/supervisor-topic-list.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';

const routes: Routes = [
  { path: 'create', component: TopicCreateComponent },

  { path: 'candidates', component: CandidatesListComponent },

  { path: '', component: SupervisorTopicListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicSupervisorRoutingModule {}
