import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-declaration',
  templateUrl: './student-declaration.component.html',
  styleUrls: ['./student-declaration.component.scss'],
})
export class StudentDeclarationComponent implements OnInit {

  public formGroup: FormGroup;
  public thesisTitlePl = 'Temat pracy dyplomowej po polsku';
  public thesisTitleEn = 'Temat pracy dyplomowej po angielsku';
  public thesisSupervisor = 'Dr inż. Jan Kowalski';
  public languages: any[] = ['aa', 'bb'];
  public selectedLanguage = null;
  public purpose: string = '';
  public description: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      language: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  public onCancel() {
    this.router.navigate(['thesis']);
  }
}
