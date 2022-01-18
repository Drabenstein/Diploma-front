import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import {
  ApplicationDtoFieldOfStudyInitialTableDto,
  ApplicationsService,
} from 'src/app/generated';

@Component({
  selector: 'app-topic-application-candidates',
  templateUrl: './topic-application-candidates.component.html',
  styleUrls: ['./topic-application-candidates.component.scss'],
})
export class TopicApplicationCandidatesComponent implements OnInit {
  public fieldsOfStudy: ApplicationDtoFieldOfStudyInitialTableDto[] = [];
  public loading: Record<number, boolean> = {};
  constructor(
    private applicationService: ApplicationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicationService
      .apiApplicationsInitialByFieldGet()
      .subscribe((data) => {
        this.fieldsOfStudy = data;
        this.fieldsOfStudy.forEach((f) => {
          this.loading[f.id!] = true;
        });
      });
  }

  public loadCandidates(event: LazyLoadEvent, id: number): void {
    this.loading[id] = true;
    setTimeout(() => {
      const fieldOfStudyIndex = this.fieldsOfStudy.findIndex(
        (f) => f.id === id
      );

      this.applicationService
        .apiApplicationsGet(
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

  public openApplicationDetails(applicationId: number): void {
    this.router.navigate(['supervisor', 'application', 'applicationId']);
  }

  public onCancel(): void {
    this.router.navigate(['supervisor', 'candidates']);
  }
}
