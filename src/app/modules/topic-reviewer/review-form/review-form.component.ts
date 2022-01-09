import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  public formGroup: FormGroup;
  public thesisStudent = "Jan Kowalski 242418";
  public thesisTitle = "Temat pracy dyplomowej";

  public purpose:string = ""
  public purposeNumber: any[] = ['aa', 'bb'];
  public selectedPurposeNumber = null;

  public structure:string = ""
  public structureNumber: any[] = ['aa', 'bb'];
  public selectedStructureNumber = null;

  public design:string = ""
  public designNumber: any[] = ['aa', 'bb'];
  public selectedDesignNumber = null;

  public sources:string = ""
  public sourcesNumber: any[] = ['aa', 'bb'];
  public selectedSourcesNumber = null;

  public assesment: any[] = ['aa', 'bb'];
  public selectedAssesment = null;
  public headder = null;

  constructor(private fb: FormBuilder, private router: Router) {
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

  ngOnInit(): void {
  }

  public onCancel() {
    this.router.navigate(['reviewer']);
  }

}
