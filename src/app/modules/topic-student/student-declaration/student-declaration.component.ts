import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeclarationsService, SendDeclarationDto } from 'src/app/generated';
import { DeclarationDataDto } from 'src/app/generated/model/declarationDataDto';

@Component({
  selector: 'app-student-declaration',
  templateUrl: './student-declaration.component.html',
  styleUrls: ['./student-declaration.component.scss'],
})
export class StudentDeclarationComponent implements OnInit {
  public declaration: SendDeclarationDto = {};
  public formGroup: FormGroup;
  public declarationData: DeclarationDataDto = null!;
  public languages: any[] = [{ name: 'polski' }, { name: 'angielski' }];
  private thesisId: number = null!;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private declarationService: DeclarationsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      language: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.thesisId = Number(
      this.activatedRoute.snapshot.paramMap.get('thesisId')
    );
    this.declarationService.apiDeclarationsGet(0).subscribe((data) => {
      this.declarationData = data;
    });
  }

  public onSend() {
    this.declaration.hasConsentToChangeLanguage = true;
    this.declaration.thesisId = this.thesisId;
    const date = new Date();
    this.declaration.declarationDateTime = this.datepipe.transform(
      date,
      'MMMM d, y, h:mm:ss a z'
    )!;

    this.declarationService
      .apiDeclarationsPost(this.declaration)
      .subscribe((_) => {
        this.router.navigate(['thesis']);
      });
  }

  public onCancel() {
    this.router.navigate(['thesis']);
  }
}
