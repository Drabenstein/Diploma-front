import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  ApplicationsService,
  AWSService,
  ThesesService,
  TopicsService,
} from 'src/app/generated';
import { ApprovedTopicDto } from 'src/app/generated/model/approvedTopicDto';
import { MyThesisDto } from 'src/app/generated/model/myThesisDto';

@Component({
  selector: 'app-student-thesis',
  templateUrl: './student-thesis.component.html',
  styleUrls: ['./student-thesis.component.scss'],
})
export class StudentThesisComponent implements OnInit {
  public abstract: string = '';
  public abstractResult: string = '';
  public myThesis: MyThesisDto = null!;
  public myAcceptedTopics: ApprovedTopicDto[] = [];
  public thesisId: number = null!;
  private translatedData: Record<string, string> = {};
  constructor(
    private awsService: AWSService,
    private topicService: TopicsService,
    private thesisService: ThesesService,
    private applicationService: ApplicationsService,
    private router: Router,
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

    this.topicService.apiTopicsMyAcceptedTopicsGet().subscribe((data) => {
      this.myAcceptedTopics = data;
    });

    this.thesisService.apiThesesGetThesisIdGet().subscribe((id) => {
      this.thesisId = id;
      if (this.thesisId !== 0) {
        this.thesisService.apiThesesMyThesisGet(this.thesisId).subscribe((thesis) => {
          this.myThesis = thesis;
        });
      }
    });
  }

  public onAbstractTranslate(): void {
    this.awsService.apiAwsTranslateGet(this.abstract).subscribe((text) => {
      this.abstractResult = text;
    });
  }

  public onUploadThesis(event: any): void {
    let uploadedFile: File;
    let fileReader = new FileReader();
    for (let file of event.files) {
      uploadedFile = file;
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        let uploadedFileString: any = fileReader.result;
        console.log(uploadedFileString);
        this.awsService
          .apiAwsUploadThesisPost(this.thesisId, uploadedFileString)
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
            },
          });
      };
    }
  }

  public onDownloadThesis(): void {
    this.awsService.apiAwsDownloadThesisGet(this.thesisId).subscribe((data) => {
      saveAs(
        new Blob([data], { type: 'application/pdf' }),
        this.thesisId + '_thesis.pdf'
      );
    });
  }

  public onDeleteThesis(): void {
    this.awsService.apiAwsDeleteThesisDelete(this.thesisId).subscribe({
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
      },
    });
  }

  public onConfirmTopic(applicationId: number): void {
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

  public onSendDeclaration(): void {
    this.router.navigate([
      'thesis',
      'declaration',
      { thesisId: this.thesisId },
    ]);
  }

  public onOpenReview(reviewId: number): void {
    this.router.navigate(['thesis', 'review', reviewId]);
  }
}
