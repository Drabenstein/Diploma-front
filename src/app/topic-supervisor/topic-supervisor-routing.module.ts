import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorTopicListComponent } from './supervisor-topic-list/supervisor-topic-list.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';

const routes: Routes = [
  { path: 'create', component: TopicCreateComponent },

  { path: '', component: SupervisorTopicListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicSupervisorRoutingModule {}
