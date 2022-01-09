import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-propose',
  templateUrl: './topic-propose.component.html',
  styleUrls: ['./topic-propose.component.scss'],
})
export class TopicProposeComponent implements OnInit {
  public formGroup: FormGroup;
  public supervisors: any[] = ['aa', 'bb'];
  public selectedSupervisor = null;
  public fieldsOfStudy: any[] = ['aa', 'bb'];
  public selectedFieldOfStudy = null;
  public maxRealiztions: number = 1;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      supervisors: new FormControl(null, [Validators.required]),
      fieldsOfStudy: new FormControl(null, [Validators.required]),
      maxRealiztions: new FormControl(null, [Validators.required]),
      topicNamePl: new FormControl(null, [Validators.required]),
      topicNameEn: new FormControl(null, [Validators.required]),
      message: new FormControl(null),
    });
  }
  ngOnInit(): void {}


  public onCancel() {
    this.router.navigate(['list']);
  }

}
