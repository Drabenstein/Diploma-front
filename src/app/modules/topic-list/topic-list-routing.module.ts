import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicApplicationComponent } from './topic-application/topic-application.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicProposeComponent } from './topic-propose/topic-propose.component';

const routes: Routes = [
  { path: 'application/:id', component: TopicApplicationComponent },

  { path: 'proposal', component: TopicProposeComponent },

  { path: '', component: TopicListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicListRoutingModule {}
