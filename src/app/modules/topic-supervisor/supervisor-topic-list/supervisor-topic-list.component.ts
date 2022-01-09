import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-topic-list',
  templateUrl: './supervisor-topic-list.component.html',
  styleUrls: ['./supervisor-topic-list.component.scss'],
})
export class SupervisorTopicListComponent implements OnInit {
  public fields = [[{ name: 'abc' }], [{ name: 'abc1' }]];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onCreateTopic() {
    this.router.navigate(['supervisor', 'create']);
  }
}
