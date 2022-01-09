import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-supervisor-application',
  templateUrl: './topic-supervisor-application.component.html',
  styleUrls: ['./topic-supervisor-application.component.scss']
})
export class TopicSupervisorApplicationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public onCancel() {
    this.router.navigate(['list']);
  }
}
