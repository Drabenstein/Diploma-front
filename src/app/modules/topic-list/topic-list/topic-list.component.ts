import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import {
  StudentsTopicDtoFieldOfStudyInitialTableDto,
  TopicsService,
} from 'src/app/generated';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
})
export class TopicListComponent implements OnInit {
  public fieldsOfStudy: StudentsTopicDtoFieldOfStudyInitialTableDto[] = [];

  public loading: Record<number, boolean> = {};
  constructor(private topicService: TopicsService, private router: Router) {}

  ngOnInit(): void {
    this.topicService.apiTopicsGet().subscribe((data) => {
      this.fieldsOfStudy = data;
      this.fieldsOfStudy.forEach((f) => {
        this.loading[f.id!] = true;
      });
    });
  }

  public loadTopics(event: LazyLoadEvent, id: number) {
    this.loading[id] = true;
    setTimeout(() => {
      const fieldOfStudyIndex = this.fieldsOfStudy.findIndex(
        (f) => f.id === id
      );

      this.topicService
        .apiTopicsTopicsPageGet(
          this.fieldsOfStudy[fieldOfStudyIndex]?.id,
          this.fieldsOfStudy[fieldOfStudyIndex]?.defenceYear!,
          event.first! / event.rows! + 1,
          event.rows
        )
        .subscribe((data) => {
          this.fieldsOfStudy[fieldOfStudyIndex].data = data;
          this.loading[id] = false;
        });
    }, 1000);
  }

  public onAddApplication(
    topicId: number,
    topicName: string,
    englishTopicName: string,
    tutorName: string
  ) {
    this.router.navigate([
      'list',
      'application',
      topicId,
      {
        topicName: topicName,
        englishTopicName: englishTopicName,
        tutorName: tutorName,
      },
    ]);
  }

  public onProposeTopic() {
    this.router.navigate(['list', 'proposal']);
  }
}
