import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FieldOfStudyForApplicationDto,
  TopicsService,
  TutorForApplicationDto,
} from 'src/app/generated';

@Component({
  selector: 'app-topic-propose',
  templateUrl: './topic-propose.component.html',
  styleUrls: ['./topic-propose.component.scss'],
})
export class TopicProposeComponent implements OnInit {
  public formGroup: FormGroup;
  public supervisors: { id: number; name: string }[] = [];
  public selectedSupervisor: number = null!;
  public fieldsOfStudy: FieldOfStudyForApplicationDto[] = [];
  public selectedFieldOfStudy: number = null!;
  public maxRealiztions: number = 1;
  public topicNamePl: string = '';
  public topicNameEn: string = '';
  public message: string = '';
  private translatedData: Record<string, string> = {};

  constructor(
    private topicService: TopicsService,
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formGroup = this.fb.group({
      supervisors: new FormControl(null, [Validators.required]),
      fieldsOfStudy: new FormControl(null, [Validators.required]),
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
      message: new FormControl(null),
    });
  }
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

    this.topicService.apiTopicsPossibleFieldsOfStudyGet().subscribe((data) => {
      this.fieldsOfStudy = data;
    });

    this.topicService.apiTopicsPossibleTutorsGet().subscribe((data) => {
      this.supervisors = data.map((s) => {
        const supervisor: { id: number; name: string } = {
          id: s.id!,
          name: s.academicDegree + ' ' + s.firstName + ' ' + s.lastName,
        };
        return supervisor;
      });
    });
  }

  public onSendPropose(event: Event) {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proposeSend();
      },
      reject: () => this.confirmationService.close(),
    });
  }

  public onCancel() {
    this.router.navigate(['list']);
  }

  private proposeSend() {
    if (this.formGroup.valid) {
      this.topicService
        .apiTopicsPost(
          this.selectedSupervisor,
          this.selectedFieldOfStudy,
          this.maxRealiztions,
          this.topicNamePl,
          this.topicNameEn,
          this.message
        )
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
            setTimeout(() => this.router.navigate(['list']), 1000);
          },
        });
    }
  }
}
