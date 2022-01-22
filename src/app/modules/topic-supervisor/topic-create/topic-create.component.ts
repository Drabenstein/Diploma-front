import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import {
  FieldOfStudyForApplicationDto,
  TopicsService,
} from 'src/app/generated';
import { CreateTopicDto } from 'src/app/generated/model/createTopicDto';

@Component({
  selector: 'app-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.scss'],
})
export class TopicCreateComponent implements OnInit {
  public formGroup: FormGroup;
  public years: { name: number }[] = [
    { name: 2022 },
    { name: 2023 },
    { name: 2024 },
    { name: 2025 },
    { name: 2026 },
  ];
  public fieldsOfStudy: FieldOfStudyForApplicationDto[] = [];
  public createTopicDto: CreateTopicDto = {};
  private translatedData: Record<string, string> = {};

  constructor(
    private topicService: TopicsService,
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = this.fb.group({
      fieldsOfStudy: new FormControl(null, [Validators.required]),
      years: new FormControl(null, [Validators.required]),
      maxRealiztions: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(4),
      ]),
      topicNamePl: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      topicNameEn: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  ngOnInit(): void {
    this.translateService
      .get(['CONFIRMATION.MESSAGE', 'CONFIRMATION.YES', 'CONFIRMATION.NO'])
      .subscribe((data: Record<string, string>) => {
        this.translatedData = data;
      });

    this.topicService.apiTopicsPossibleFieldsOfStudyGet().subscribe((data) => {
      this.fieldsOfStudy = data;
    });
  }

  public onSubmit(event: Event) {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.submit();
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onCancel() {
    this.router.navigate(['supervisor']);
  }

  private submit() {
    if (this.formGroup.valid) {
      this.topicService
        .apiTopicsCreateTopicPost(this.createTopicDto)
        .subscribe((_) => {
          this.router.navigate(['supervisor']);
        });
    } else {
    }
  }
}
