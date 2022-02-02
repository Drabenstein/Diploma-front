import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FilledReviewModuleDto,
  PostReviewDto,
  ReviewDataDto,
  ReviewersService,
  ThesesService,
} from 'src/app/generated';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  public formGroup: FormGroup;
  public review: ReviewDataDto = {};
  public purpose: string = '';
  public purposeNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedPurposeNumber: number = null!;

  public structure: string = '';
  public structureNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedStructureNumber: number = null!;

  public design: string = '';
  public designNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedDesignNumber: number = null!;

  public sources: string = '';
  public sourcesNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedSourcesNumber: number = null!;

  public assesment: { name: number }[] = [
    { name: 2.0 },
    { name: 3.0 },
    { name: 3.5 },
    { name: 4.0 },
    { name: 4.5 },
    { name: 5.0 },
    { name: 5.5 },
  ];
  public selectedAssesment: number = null!;
  private thesisId: number = null!;
  private translatedData: Record<string, string> = {};

  constructor(
    private reviewService: ReviewersService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formGroup = this.fb.group({
      purpose: new FormControl(null),
      purposeNumber: new FormControl(null, [Validators.required]),
      structure: new FormControl(null),
      structureNumber: new FormControl(null, [Validators.required]),
      design: new FormControl(null),
      designNumber: new FormControl(null, [Validators.required]),
      sources: new FormControl(null),
      sourcesNumber: new FormControl(null, [Validators.required]),
      assesment: new FormControl(null, [Validators.required]),
    });
  }

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

    this.thesisId = this.activatedRoute.snapshot.params['id'];

    this.reviewService
      .apiReviewersGetDataForReviewGet(this.thesisId)
      .subscribe((data) => {
        this.review = data;
      });
  }

  public onConfirm(event: Event) {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirm();
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onCancel() {
    this.router.navigate(['reviewer']);
  }

  private confirm() {
    let reviewPost: PostReviewDto = {};
    reviewPost.grade = this.selectedAssesment.toString();
    reviewPost.reviewId = this.review.reviewId;
    let filledModules: FilledReviewModuleDto[] = this.constructModules();
    reviewPost.reviewModules = filledModules;
    this.reviewService.apiReviewersPostReviewPost(reviewPost).subscribe({
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
        setTimeout(() => this.router.navigate(['reviewer']), 1000);
      },
    });
  }

  private constructModules(): FilledReviewModuleDto[] {
    const modules: FilledReviewModuleDto[] = [
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Cel i zakres pracy' && m.type === 'Text'
        )?.id,
        name: 'Cel i zakres pracy',
        type: 'Text',
        value: this.purpose,
      },
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Cel i zakres pracy' && m.type === 'Number'
        )?.id,
        name: 'Cel i zakres pracy',
        type: 'Number',
        value: this.selectedPurposeNumber.toString(),
      },
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Struktura pracy' && m.type === 'Text'
        )?.id,
        name: 'Struktura pracy',
        type: 'Text',
        value: this.structure,
      },
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Struktura pracy' && m.type === 'Number'
        )?.id,
        name: 'Struktura pracy',
        type: 'Number',
        value: this.selectedStructureNumber.toString(),
      },
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Część analityczno projektowa' && m.type === 'Text'
        )?.id,
        name: 'Część analityczno projektowa',
        type: 'Text',
        value: this.design,
      },
      {
        id: this.review.modules?.find(
          (m) =>
            m.name === 'Część analityczno projektowa' && m.type === 'Number'
        )?.id,
        name: 'Część analityczno projektowa',
        type: 'Number',
        value: this.selectedDesignNumber.toString(),
      },
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Źródła i redakcja pracy' && m.type === 'Text'
        )?.id,
        name: 'Źródła i redakcja pracy',
        type: 'Text',
        value: this.sources,
      },
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Źródła i redakcja pracy' && m.type === 'Number'
        )?.id,
        name: 'Źródła i redakcja pracy',
        type: 'Number',
        value: this.selectedSourcesNumber.toString(),
      },
      {
        id: this.review.modules?.find(
          (m) => m.name === 'Ocena' && m.type === 'Number'
        )?.id,
        name: 'Ocena',
        type: 'Number',
        value: this.selectedAssesment.toString(),
      },
    ];
    return modules;
  }
}
