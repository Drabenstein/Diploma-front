import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private topicService: TopicsService,
    private fb: FormBuilder,
    private router: Router
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
  ngOnInit(): void {
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

  public onSendPropose() {
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
        .subscribe((_) => {
          this.router.navigate(['list']);
        });
    }
  }

  public onCancel() {
    this.router.navigate(['list']);
  }
}
