import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MyThesisDto,
  StudentsReviewDataDto,
  ThesesService,
} from 'src/app/generated';

@Component({
  selector: 'app-student-thesis-review',
  templateUrl: './student-thesis-review.component.html',
  styleUrls: ['./student-thesis-review.component.scss'],
})
export class StudentThesisReviewComponent implements OnInit {
  public purpose: string = '';
  public purposeNumber: number = null!;
  public structure: string = '';
  public structureNumber: number = null!;
  public design: string = '';
  public designNumber: number = null!;
  public sources: string = '';
  public sourcesNumber: number = null!;
  public assesment: number = null!;
  public review: StudentsReviewDataDto = null!;
  public thesis: MyThesisDto = null!;
  private thesisId: number = null!;
  private reviewId: number = null!;

  constructor(
    private thesisService: ThesesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.reviewId = this.activatedRoute.snapshot.params['reviewId'];
    this.thesisId = this.activatedRoute.snapshot.params['thesisId'];
    this.thesisService
      .apiThesesStudentsReviewDisplayGet(this.reviewId)
      .subscribe((data) => {
        this.review = data;
        this.purpose = this.review.modules?.find(
          (m) => m.name === 'Cel i zakres pracy' && m.type === 'Text'
        )?.value!;
        this.purposeNumber = Number(
          this.review.modules?.find(
            (m) => m.name === 'Cel i zakres pracy' && m.type === 'Number'
          )?.value!
        );
        this.structure = this.review.modules?.find(
          (m) => m.name === 'Struktura pracy' && m.type === 'Text'
        )?.value!;
        this.structureNumber = Number(
          this.review.modules?.find(
            (m) => m.name === 'Struktura pracy' && m.type === 'Number'
          )?.value!
        );
        this.design = this.review.modules?.find(
          (m) => m.name === 'Część analityczno projektowa' && m.type === 'Text'
        )?.value!;
        this.designNumber = Number(
          this.review.modules?.find(
            (m) =>
              m.name === 'Część analityczno projektowa' && m.type === 'Number'
          )?.value!
        );
        this.sources = this.review.modules?.find(
          (m) => m.name === 'Źródła i redakcja pracy' && m.type === 'Text'
        )?.value!;
        this.sourcesNumber = Number(
          this.review.modules?.find(
            (m) => m.name === 'Źródła i redakcja pracy' && m.type === 'Number'
          )?.value!
        );
        this.assesment = Number(
          this.review.modules?.find(
            (m) => m.name === 'Ocena' && m.type === 'Number'
          )?.value!
        );
      });

    this.thesisService.apiThesesMyThesisGet(this.thesisId).subscribe((data) => {
      this.thesis = data;
    });
  }

  public onCancel() {
    this.router.navigate(['thesis']);
  }
}
