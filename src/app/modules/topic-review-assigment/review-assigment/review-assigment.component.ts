import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ThesesService, TopicsService } from 'src/app/generated';
import { ThesisForReviewerAssignmentDtoFieldOfStudyInitialTableDto } from 'src/app/generated/model/thesisForReviewerAssignmentDtoFieldOfStudyInitialTableDto';
import { ThesisForReviewerAssignmentDto } from 'src/app/generated/model/thesisForReviewerAssignmentDto';
import { ReviewerChangeDto } from 'src/app/generated/model/reviewerChangeDto';
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
  constructor(
    private topicService: TopicsService,
    private thesesService: ThesesService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  public onRevieverChange(records: ThesisForReviewerAssignmentDto[]): void {
    const newReviewers: ReviewerChangeDto[] = records.map((r) => {
      const reviewer: ReviewerChangeDto = {
        thesisId: r.id!,
        reviewerId: r.reviewerId!,
      };
      return reviewer;
    });
    this.thesesService
      .apiThesesReviewersBulkPost(newReviewers)
      .subscribe((_) => {
        window.location.reload;
      });
  }

  public onWorkerList(): void {
    this.router.navigate(['review-assigments', 'list']);
  }
}
