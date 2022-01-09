import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { SupervisorTopicListComponent } from './supervisor-topic-list/supervisor-topic-list.component';
import { TopicApplicationCandidatesComponent } from './topic-application-candidates/topic-application-candidates.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { TopicSupervisorApplicationComponent } from './topic-supervisor-application/topic-supervisor-application.component';

const routes: Routes = [
  {
    path: 'candidates/application/:id',
    component: TopicSupervisorApplicationComponent,
  },

  {
    path: 'candidates/applications',
    component: TopicApplicationCandidatesComponent,
  },

  { path: 'candidates', component: CandidatesListComponent },

  { path: 'create', component: TopicCreateComponent },

  { path: '', component: SupervisorTopicListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicSupervisorRoutingModule {}
