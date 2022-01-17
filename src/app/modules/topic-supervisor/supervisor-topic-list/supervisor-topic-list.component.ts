import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { TopicsService } from 'src/app/generated';
import { TutorsTopicDtoFieldOfStudyInitialTableDto } from 'src/app/generated/model/tutorsTopicDtoFieldOfStudyInitialTableDto';

@Component({
  selector: 'app-supervisor-topic-list',
  templateUrl: './supervisor-topic-list.component.html',
  styleUrls: ['./supervisor-topic-list.component.scss'],
})
export class SupervisorTopicListComponent implements OnInit {
  public fieldsOfStudy: TutorsTopicDtoFieldOfStudyInitialTableDto[] = [];

  public loading: Record<number, boolean> = {};
  constructor(private topicService: TopicsService, private router: Router) {}

  ngOnInit(): void {
    this.topicService.apiTopicsTopicsForTutorGet().subscribe((data) => {
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
        .apiTopicsTopicsForTutorPageGet(
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

  public onCreateTopic() {
    this.router.navigate(['supervisor', 'create']);
  }
}
