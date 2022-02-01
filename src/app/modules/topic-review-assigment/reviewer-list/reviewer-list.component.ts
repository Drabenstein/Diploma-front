import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AreaOfInterestDto,
  AreasOfInterestService,
  ReviewersService,
  ReviewerWithInterestsDto,
  ReviewerWithInterestsDtoPagedResultDto,
} from 'src/app/generated';

@Component({
  selector: 'app-reviewer-list',
  templateUrl: './reviewer-list.component.html',
  styleUrls: ['./reviewer-list.component.scss'],
})
export class ReviewerListComponent implements OnInit {
  public formGroup: FormGroup;
  public areas: AreaOfInterestDto[] = [];
  public selectedAreas: AreaOfInterestDto[] = [];
  public minReviews: number = 1;
  public maxReviews: number = 1;
  public workers: ReviewerWithInterestsDto[] = [];

  constructor(
    private areasService: AreasOfInterestService,
    private reviewersService: ReviewersService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      minReviews: new FormControl(null),
      maxReviews: new FormControl(null),
      areas: new FormControl(null),
    });
  }

  public ngOnInit(): void {
    this.areasService
      .apiAreasOfInterestGetAreasOfInterestGet()
      .subscribe((data) => {
        this.areas = data;
      });
  }

  public searchForReviewers() {
    if (this.formGroup.valid) {
      const selectedAreasIds: number[] = this.selectedAreas.map((a) => a.id!);
      this.reviewersService
        .apiReviewersGetReviewersWithInterestsGet(
          selectedAreasIds,
          this.minReviews,
          this.maxReviews,
          1,
          10000
        )
        .subscribe((data) => {
          this.workers = data.results!;
        });
    }
  }

  public getAreaName(area: number): string {
    return this.areas.find((a) => (a.id = area))?.name!;
  }

  public onCancel() {
    this.router.navigate(['review-assigments']);
  }
}
