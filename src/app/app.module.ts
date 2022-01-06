import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { TopicApprovalModule } from './modules/topic-approval/topic-approval.module';
import { TopicListModule } from './modules/topic-list/topic-list.module';
import { TopicReviewAssigmentModule } from './modules/topic-review-assigment/topic-review-assigment.module';
import { TopicReviewerModule } from './modules/topic-reviewer/topic-reviewer.module';
import { TopicStudentModule } from './modules/topic-student/topic-student.module';
import { TopicSupervisorModule } from './modules/topic-supervisor/topic-supervisor.module';
import { UserModule } from './modules/user/user.module';

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
