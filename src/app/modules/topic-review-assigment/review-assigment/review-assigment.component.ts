import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ThesesService, TopicsService } from 'src/app/generated';
import { ThesisForReviewerAssignmentDtoFieldOfStudyInitialTableDto } from 'src/app/generated/model/thesisForReviewerAssignmentDtoFieldOfStudyInitialTableDto';
import { ThesisForReviewerAssignmentDto } from 'src/app/generated/model/thesisForReviewerAssignmentDto';
import { ReviewerChangeDto } from 'src/app/generated/model/reviewerChangeDto';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-review-assigment',
  templateUrl: './review-assigment.component.html',
  styleUrls: ['./review-assigment.component.scss'],
})
export class ReviewAssigmentComponent implements OnInit {
  public fieldsOfStudy: ThesisForReviewerAssignmentDtoFieldOfStudyInitialTableDto[] =
    [];
  public reviewers: { id: number; name: string }[] = [];

  public loading: Record<number, boolean> = {};
  private translatedData: Record<string, string> = {};
  constructor(
    private topicService: TopicsService,
    private thesesService: ThesesService,
    private router: Router,
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

    this.thesesService
      .apiThesesReviewerAssignmentInitialGet()
      .subscribe((data) => {
        this.fieldsOfStudy = data;
        this.fieldsOfStudy.forEach((f) => {
          this.loading[f.id!] = true;
        });
      });

    this.topicService.apiTopicsPossibleTutorsGet().subscribe((data) => {
      this.reviewers = data.map((s) => {
        const reviewer: { id: number; name: string } = {
          id: s.id!,
          name: s.academicDegree + ' ' + s.firstName + ' ' + s.lastName,
        };
        return reviewer;
      });
    });
  }

  public loadCandidates(event: LazyLoadEvent, id: number): void {
    this.loading[id] = true;
    setTimeout(() => {
      const fieldOfStudyIndex = this.fieldsOfStudy.findIndex(
        (f) => f.id === id
      );

      this.thesesService
        .apiThesesSupervisedGet(
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

  public onRevieverChange(
    event: Event,
    records: ThesisForReviewerAssignmentDto[]
  ): void {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.changeReviewer(records);
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onWorkerList(): void {
    this.router.navigate(['review-assigments', 'list']);
  }

  private changeReviewer(records: ThesisForReviewerAssignmentDto[]): void {
    const newReviewers: ReviewerChangeDto[] = records.map((r) => {
      const reviewer: ReviewerChangeDto = {
        thesisId: r.id!,
        reviewerId: r.reviewerId!,
      };
      return reviewer;
    });
    this.thesesService.apiThesesReviewersBulkPost(newReviewers).subscribe({
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
