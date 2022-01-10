import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-approval',
  templateUrl: './topic-approval.component.html',
  styleUrls: ['./topic-approval.component.scss']
})
export class TopicApprovalComponent implements OnInit {

  public fields = [[{ name: 'abc' }], [{ name: 'abc1' }]];

  constructor() { }

  ngOnInit(): void {
  }

}
