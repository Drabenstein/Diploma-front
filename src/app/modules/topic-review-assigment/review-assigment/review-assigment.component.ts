import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-assigment',
  templateUrl: './review-assigment.component.html',
  styleUrls: ['./review-assigment.component.scss'],
})
export class ReviewAssigmentComponent implements OnInit {
  public fields = [[{ name: 'abc' }], [{ name: 'abc1' }]];
  public reviewers: any[] = ['aa', 'bb'];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onWorkerList() {
    this.router.navigate(['review-assigments', 'list']);
  }
}
