import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements OnInit {
  public fields = [[{ name: 'abc' }], [{ name: 'abc1' }]];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onApplicationsCheck() {
    this.router.navigate(['supervisor', 'candidates', 'applications']);
  }
}
