import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplicationsService } from 'src/app/generated';
import { ApplicationDetailsDto } from 'src/app/generated/model/applicationDetailsDto';

@Component({
  selector: 'app-topic-supervisor-application',
  templateUrl: './topic-supervisor-application.component.html',
  styleUrls: ['./topic-supervisor-application.component.scss'],
})
export class TopicSupervisorApplicationComponent implements OnInit {
  public application: ApplicationDetailsDto = null!;
  public isProposal: boolean = null!;
  private applicationId: number = null!;
  private translatedData: Record<string, string> = {};

  constructor(
    private applicationService: ApplicationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
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

    this.applicationId = this.activatedRoute.snapshot.params['id'];
    this.isProposal = Boolean(
      this.activatedRoute.snapshot.paramMap.get('isProposal')
    );

    this.applicationService
      .apiApplicationsApplicationIdGet(this.applicationId)
      .subscribe((data) => {
        this.application = data;
      });
  }

  public onApply(event: Event) {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apply();
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onDeny(event: Event) {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deny();
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onCancel() {
    this.router.navigate(['list', 'candidates', 'applications']);
  }

  private apply() {
    this.applicationService
      .apiApplicationsApplicationIdAcceptPost(this.applicationId)
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
          setTimeout(
            () => this.router.navigate(['list', 'candidates', 'applications']),
            1000
          );
        },
      });
  }

  private deny() {
    this.applicationService
      .apiApplicationsApplicationIdRejectPost(this.applicationId)
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
          setTimeout(
            () => this.router.navigate(['list', 'candidates', 'applications']),
            1000
          );
        },
      });
  }
}
