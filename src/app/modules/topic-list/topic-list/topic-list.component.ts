import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
})
export class TopicListComponent implements OnInit {
  public fields = [[{ name: 'abc' }], [{ name: 'abc1' }]];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onProposeTopic() {
    this.router.navigate(['list', 'proposal']);
  }
}
