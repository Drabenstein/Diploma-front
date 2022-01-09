import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewer-list',
  templateUrl: './reviewer-list.component.html',
  styleUrls: ['./reviewer-list.component.scss']
})
export class ReviewerListComponent implements OnInit {

  public formGroup: FormGroup;
  public areas:any[] = [];
  public selectedAreas = [];
  public minReviews: number = 1;
  public maxReviews: number = 1;
  public workers: any[] = []

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      minReviews: new FormControl(null),
      maxReviews: new FormControl(null),
      areas: new FormControl(null),
    });
    this.areas = [
      {name: 'New York', code: 'NY', inactive: false},
      {name: 'Rome', code: 'RM', inactive: true},
      {name: 'London', code: 'LDN', inactive: false},
      {name: 'Istanbul', code: 'IST', inactive: true},
      {name: 'Paris', code: 'PRS', inactive: false}
  ];
   }

  ngOnInit(): void {
  }

  public onCancel() {
    this.router.navigate(['review-assigments']);
  }

}
