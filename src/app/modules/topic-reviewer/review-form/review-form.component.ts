import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { MyThesisDto, ThesesService } from 'src/app/generated';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  public formGroup: FormGroup;
  public thesis: MyThesisDto = {};
  public purpose: string = '';
  public purposeNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedPurposeNumber = null;

  public structure: string = '';
  public structureNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedStructureNumber = null;

  public design: string = '';
  public designNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedDesignNumber = null;

  public sources: string = '';
  public sourcesNumber: { name: number }[] = [
    { name: 0 },
    { name: 0.5 },
    { name: 1 },
  ];
  public selectedSourcesNumber = null;

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
    private thesisService: ThesesService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService
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
      .get(['CONFIRMATION.MESSAGE', 'CONFIRMATION.YES', 'CONFIRMATION.NO'])
      .subscribe((data: Record<string, string>) => {
        this.translatedData = data;
      });

    this.thesisId = this.activatedRoute.snapshot.params['id'];
    this.thesisService.apiThesesMyThesisGet(this.thesisId).subscribe((data) => {
      this.thesis = data;
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
    //TODO
    this.router.navigate(['reviewer']);
  }
}
