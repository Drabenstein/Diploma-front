import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TopicsService } from 'src/app/generated';

@Component({
  selector: 'app-topic-application',
  templateUrl: './topic-application.component.html',
  styleUrls: ['./topic-application.component.scss'],
})
export class TopicApplicationComponent implements OnInit {
  public namePolish: string = '';
  public nameEnglish: string = '';
  public supervisor: string = '';
  public message: string = '';
  private thesisId: number = null!;
  private translatedData: Record<string, string> = {};

  constructor(
    private topicService: TopicsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
    this.thesisId = this.activatedRoute.snapshot.params['id'];
    this.namePolish = this.activatedRoute.snapshot.paramMap.get('topicName')!;
    this.nameEnglish =
      this.activatedRoute.snapshot.paramMap.get('englishTopicName')!;
    this.supervisor = this.activatedRoute.snapshot.paramMap.get('tutorName')!;
  }

  public onApplicationSend(event: Event) {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sendApplication();
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onCancel() {
    this.router.navigate(['list']);
  }

  private sendApplication() {
    this.topicService
      .apiTopicsApplyForTopicPost(this.thesisId, this.message)
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
          setTimeout(() => this.router.navigate(['list']), 1000);
        },
      });
  }
}
