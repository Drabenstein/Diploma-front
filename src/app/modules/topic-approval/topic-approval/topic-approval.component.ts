import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { TopicsService } from 'src/app/generated';
import { TopicForConsiderationDtoFieldOfStudyInitialTableDto } from 'src/app/generated/model/topicForConsiderationDtoFieldOfStudyInitialTableDto';

@Component({
  selector: 'app-topic-approval',
  templateUrl: './topic-approval.component.html',
  styleUrls: ['./topic-approval.component.scss'],
})
export class TopicApprovalComponent implements OnInit {
  public topicApprovalSelectionList: number[] = [];
  public fieldsOfStudy: TopicForConsiderationDtoFieldOfStudyInitialTableDto[] =
    [];

  public loading: Record<number, boolean> = {};
  constructor(private topicService: TopicsService) {}

  ngOnInit(): void {
    this.topicService
      .apiTopicsForConsiderationInitialGet()
      .subscribe((data) => {
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
        .apiTopicsForConsiderationGet(
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

  public onTopicsApprove(): void {
    this.topicService
      .apiTopicsBulkAcceptPost(this.topicApprovalSelectionList)
      .subscribe((_) => {
        window.location.reload();
      });
  }

  public onTopicsDeny(): void {
    this.topicService
      .apiTopicsBulkRejectPost(this.topicApprovalSelectionList)
      .subscribe((_) => {
        window.location.reload();
      });
  }
}
