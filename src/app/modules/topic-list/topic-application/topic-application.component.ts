import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicsService } from 'src/app/generated';

@Component({
  selector: 'app-topic-application',
  templateUrl: './topic-application.component.html',
  styleUrls: ['./topic-application.component.scss'],
})
export class TopicApplicationComponent implements OnInit {
  public namePolish: string = '';
  public nameEnglish: string = '';
  public supervisor: string = '';
  public message: string = '';
  private thesisId: number = null!;

  constructor(
    private topicService: TopicsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.thesisId = this.activatedRoute.snapshot.params['id'];
    this.namePolish = this.activatedRoute.snapshot.paramMap.get('topicName')!;
    this.nameEnglish =
      this.activatedRoute.snapshot.paramMap.get('englishTopicName')!;
    this.supervisor = this.activatedRoute.snapshot.paramMap.get('tutorName')!;
  }

  public onApplicationSend() {
    this.topicService
      .apiTopicsApplyForTopicPost(this.thesisId, this.message)
      .subscribe((_) => {
        this.router.navigate(['list']);
      });
  }

  public onCancel() {
    this.router.navigate(['list']);
  }
}
