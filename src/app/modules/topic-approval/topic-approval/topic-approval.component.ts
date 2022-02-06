import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { TopicForConsiderationDto, TopicsService } from 'src/app/generated';
import { TopicForConsiderationDtoFieldOfStudyInitialTableDto } from 'src/app/generated/model/topicForConsiderationDtoFieldOfStudyInitialTableDto';

@Component({
  selector: 'app-topic-approval',
  templateUrl: './topic-approval.component.html',
  styleUrls: ['./topic-approval.component.scss'],
})
export class TopicApprovalComponent implements OnInit {
  public topicApprovalSelectionList: Record<
    number,
    TopicForConsiderationDto[]
  > = {};
  public fieldsOfStudy: TopicForConsiderationDtoFieldOfStudyInitialTableDto[] =
    [];
  private translatedData: Record<string, string> = {};
  public loading: Record<number, boolean> = {};
  constructor(
    private topicService: TopicsService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.translateService
      .get([
        'CONFIRMATION.SUCCESS',
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

    this.topicService
      .apiTopicsForConsiderationInitialGet()
      .subscribe((data) => {
        this.fieldsOfStudy = data;
        this.fieldsOfStudy.forEach((f) => {
          this.loading[f.id!] = true;
          this.topicApprovalSelectionList[f.id!] = [];
        });
      });
  }

  public loadTopics(event: LazyLoadEvent, id: number): void {
    this.loading[id] = true;
    setTimeout(() => {
      const fieldOfStudyIndex = this.fieldsOfStudy.findIndex(
        (f) => f.id === id
      );

      this.topicService
        .apiTopicsForConsiderationGet(
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

  public onTopicsApprove(event: Event, id: number): void {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.approveTopics(id);
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onTopicsDeny(event: Event, id: number): void {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.denyTopics(id);
      },
      reject: () => this.confirmationService.close(),
    });
  }

  private approveTopics(id: number): void {
    this.topicService
      .apiTopicsBulkAcceptPost(
        this.topicApprovalSelectionList[id].map((t) => t.id!)
      )
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

  private denyTopics(id: number): void {
    this.topicService
      .apiTopicsBulkRejectPost(
        this.topicApprovalSelectionList[id].map((t) => t.id!)
      )
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
