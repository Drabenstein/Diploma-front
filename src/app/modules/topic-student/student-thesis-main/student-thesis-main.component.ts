import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import {
  ApplicationsService,
  StudentsThesisDto,
  ThesesService,
  TopicForConsiderationDtoFieldOfStudyInitialTableDto,
  TopicsService,
} from 'src/app/generated';

@Component({
  selector: 'app-student-thesis-main',
  templateUrl: './student-thesis-main.component.html',
  styleUrls: ['./student-thesis-main.component.scss'],
})
export class StudentThesisMainComponent implements OnInit {
  public fieldsOfStudy: TopicForConsiderationDtoFieldOfStudyInitialTableDto[] =
    [];
  public theses: StudentsThesisDto[] = [];

  public loading: Record<number, boolean> = {};
  private translatedData: Record<string, string> = {};

  constructor(
    private topicService: TopicsService,
    private thesisService: ThesesService,
    private applicationService: ApplicationsService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}
  public ngOnInit(): void {
    this.translateService
      .get([
        'CONFIRMATION.MESSAGE',
        'CONFIRMATION.YES',
        'CONFIRMATION.NO',
        'CONFIRMATION.MESSAGE',
        'CONFIRMATION.ERROR',
        'CONFIRMATION.SUCCESS_MESSAGE',
        'CONFIRMATION.ERROR_MESSAGE',
      ])
      .subscribe((data: Record<string, string>) => {
        this.translatedData = data;
      });
    this.topicService.apiTopicsStudentsApprovedTopicsGet().subscribe((data) => {
      this.fieldsOfStudy = data;
      this.fieldsOfStudy.forEach((f) => {
        this.loading[f.id!] = true;
      });
    });

    this.thesisService.apiThesesStudentsThesesGet().subscribe((data) => {
      this.theses = data;
    });
  }

  public loadTopics(event: LazyLoadEvent, id: number): void {
    this.loading[id] = true;
    setTimeout(() => {
      const fieldOfStudyIndex = this.fieldsOfStudy.findIndex(
        (f) => f.id === id
      );

      this.topicService
        .apiTopicsStudentsApprovedTopicsByYearAndFieldGet(
          this.fieldsOfStudy[fieldOfStudyIndex]?.id,
          this.fieldsOfStudy[fieldOfStudyIndex]?.defenceYear!,
          event.first! / event.rows! + 1,
          event.rows
        )
        .subscribe((data) => {
          this.fieldsOfStudy[fieldOfStudyIndex].data = data;
          this.loading[id] = false;
        });
    }, 1000);
  }

  public onConfirmTopic(event: Event, aplicationId: number): void {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmTopic(aplicationId);
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onOpenThesis(thesisId: number): void {
    this.router.navigate(['thesis', thesisId]);
  }

  private confirmTopic(applicationId: number): void {
    this.applicationService
      .apiApplicationsApplicationIdConfirmPost(applicationId)
      .subscribe({
        error: (e) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translatedData['MESSAGE.ERROR'],
            detail: this.translatedData['MESSAGE.ERROR_MESSAGE'],
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.translatedData['MESSAGE.SUCCESS'],
            detail: this.translatedData['MESSAGE.SUCCESS_MESSAGE'],
          });
          setTimeout(() => window.location.reload(), 1000);
        },
      });
  }
}
