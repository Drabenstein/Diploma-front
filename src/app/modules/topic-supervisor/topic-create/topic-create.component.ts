import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.scss']
})
export class TopicCreateComponent implements OnInit {
  public formGroup: FormGroup;
  public years: any[] = ['aa', 'bb'];
  public year = null;
  public fieldsOfStudy: any[] = ['aa', 'bb'];
  public selectedFieldOfStudy = null;
  public maxRealiztions: number = 1;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      fieldsOfStudy: new FormControl(null, [Validators.required]),
      years: new FormControl(null, [Validators.required]),
      maxRealiztions: new FormControl(null, [Validators.required]),
      topicNamePl: new FormControl(null, [Validators.required]),
      topicNameEn: new FormControl(null, [Validators.required]),
      message: new FormControl(null),
    });
  }
  ngOnInit(): void {}


  public onCancel() {
    this.router.navigate(['supervisor']);
  }

}
