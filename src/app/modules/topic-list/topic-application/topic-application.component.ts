import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-application',
  templateUrl: './topic-application.component.html',
  styleUrls: ['./topic-application.component.scss']
})
export class TopicApplicationComponent implements OnInit {

public namePolish: string = "abcc";
public nameEnglish: string = "abcc";
public supervisor: string = "abcc";
public message: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onCancel() {
    console.log('cancel');
    this.router.navigate(['list']);
  }

}
