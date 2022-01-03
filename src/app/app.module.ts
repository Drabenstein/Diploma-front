import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TopicApprovalModule } from './topic-approval/topic-approval.module';
import { TopicListModule } from './topic-list/topic-list.module';
import { TopicReviewAssigmentModule } from './topic-review-assigment/topic-review-assigment.module';
import { TopicReviewerModule } from './topic-reviewer/topic-reviewer.module';
import { TopicStudentModule } from './topic-student/topic-student.module';
import { TopicSupervisorModule } from './topic-supervisor/topic-supervisor.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TopicApprovalModule,
    TopicListModule,
    TopicReviewAssigmentModule,
    TopicReviewerModule,
    TopicStudentModule,
    TopicSupervisorModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
