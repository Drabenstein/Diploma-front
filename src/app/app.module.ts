import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, BASE_PATH } from './generated';
import { SharedModule } from './modules/shared/shared.module';
import { TopicApprovalModule } from './modules/topic-approval/topic-approval.module';
import { TopicListModule } from './modules/topic-list/topic-list.module';
import { TopicReviewAssigmentModule } from './modules/topic-review-assigment/topic-review-assigment.module';
import { TopicReviewerModule } from './modules/topic-reviewer/topic-reviewer.module';
import { TopicStudentModule } from './modules/topic-student/topic-student.module';
import { TopicSupervisorModule } from './modules/topic-supervisor/topic-supervisor.module';
import { UserModule } from './modules/user/user.module';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    TopicApprovalModule,
    TopicListModule,
    TopicReviewAssigmentModule,
    TopicReviewerModule,
    TopicStudentModule,
    TopicSupervisorModule,
    UserModule,
    ApiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AuthModule.forRoot({
      domain: environment.auth.domain,
      audience: environment.auth.audience,
      clientId: environment.auth.clientId,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    HttpClient,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
