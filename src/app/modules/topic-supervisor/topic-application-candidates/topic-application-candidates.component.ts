import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-application-candidates',
  templateUrl: './topic-application-candidates.component.html',
  styleUrls: ['./topic-application-candidates.component.scss'],
})
export class TopicApplicationCandidatesComponent implements OnInit {
  public fields = [[{ name: 'abc' }], [{ name: 'abc1' }]];
  constructor(private router: Router) {}

  ngOnInit(): void {}


  public onCancel() {
    this.router.navigate(['supervisor', 'candidates']);
  }
}
