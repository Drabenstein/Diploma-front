import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public fields = [[{ name: 'abc' }], [{ name: 'abc1' }]];

  constructor(private router: Router) {}

  ngOnInit(): void {}


}
