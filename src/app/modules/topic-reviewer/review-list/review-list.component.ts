import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { LazyLoadEvent } from 'primeng/api';
import {
  AWSService,
  ReviewersService,
  ReviewersThesisDtoFieldOfStudyInitialTableDto,
} from 'src/app/generated';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {
  public fieldsOfStudy: ReviewersThesisDtoFieldOfStudyInitialTableDto[] = [];

  public loading: Record<number, boolean> = {};
  constructor(
    private reviewerService: ReviewersService,
    private awsService: AWSService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewerService.apiReviewersGetMyReviewsGet().subscribe((data) => {
      this.fieldsOfStudy = data;
      this.fieldsOfStudy.forEach((f) => {
        this.loading[f.id!] = true;
      });
    });
  }

  public loadTopics(event: LazyLoadEvent, id: number) {
    this.loading[id] = true;
    setTimeout(() => {
      const fieldOfStudyIndex = this.fieldsOfStudy.findIndex(
        (f) => f.id === id
      );

      this.reviewerService
        .apiReviewersGetMyReviewsPageGet(
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

  public onAddReview(thesisId: number): void {
    this.router.navigate(['reviewer', 'thesis', thesisId]);
  }

  public onDownloadThesis(thesisId: number): void {
    this.awsService.apiAwsDownloadThesisGet(thesisId).subscribe((data) => {
      saveAs(
        new Blob([data], { type: 'application/pdf' }),
        thesisId + '_thesis.json'
      );
    });
  }
}
