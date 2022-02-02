import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MyThesisDto,
  ReviewDataDto,
  ReviewersService,
  ThesesService,
} from 'src/app/generated';

@Component({
  selector: 'app-student-thesis-review',
  templateUrl: './student-thesis-review.component.html',
  styleUrls: ['./student-thesis-review.component.scss'],
})
export class StudentThesisReviewComponent implements OnInit {
  public purpose: string = 'ok';
  public purposeNumber: number = 1;
  public structure: string = 'ok';
  public structureNumber: number = 1;
  public design: string = 'ok';
  public designNumber: number = 1;
  public sources: string = 'ok';
  public sourcesNumber: number = 1;
  public assesment: number = 5.0;
  public review: ReviewDataDto = null!;
  public thesis: MyThesisDto = null!;
  private thesisId: number = null!;
  private reviewId: number = null!;

  constructor(
    private reviewService: ReviewersService,
    private thesisService: ThesesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.reviewId = this.activatedRoute.snapshot.params['reviewId'];
    this.thesisId = this.activatedRoute.snapshot.params['thesisId'];
    this.reviewService
      .apiReviewersGetDataForReviewGet(this.reviewId)
      .subscribe((data) => {
        this.review = data;
        this.purpose = this.review.modules?.find(m => m.name === "Cel i zakres pracy" && m.type === "Text");
        this.purposeNumber = this.review.modules?.find(m => m.name === "Cel i zakres pracy" && m.type === "Number");
        this.structure = this.review.modules?.find(m => m.name === "Struktura pracy" && m.type === "Text");
        this.structureNumber = this.review.modules?.find(m => m.name === "Struktura pracy" && m.type === "Number");
        this.design = this.review.modules?.find(m => m.name === "Część analityczno projektowa" && m.type === "Text");
        this.designNumber = this.review.modules?.find(m => m.name === "Część analityczno projektowa" && m.type === "Number");
        this.sources = this.review.modules?.find(m => m.name === "Źródła i redakcja pracy" && m.type === "Text");
        this.sourcesNumber = this.review.modules?.find(m => m.name === "Źródła i redakcja pracy" && m.type === "Number");
        this.assesment = this.review.modules?.find(m => m.name === "Ocena" && m.type === "Number");

      });

    this.thesisService.apiThesesMyThesisGet(this.thesisId).subscribe((data) => {
      this.thesis = data;
    });
  }

  public onCancel() {
    this.router.navigate(['thesis']);
  }
}
