import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import {
  SupervisedThesisDtoFieldOfStudyInitialTableDto,
  ThesesService,
} from 'src/app/generated';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements OnInit {
  public fieldsOfStudy: SupervisedThesisDtoFieldOfStudyInitialTableDto[] = [];

  public loading: Record<number, boolean> = {};
  constructor(private thesesService: ThesesService, private router: Router) {}

  ngOnInit(): void {
    this.thesesService.apiThesesSupervisedByFieldGet().subscribe((data) => {
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

      this.thesesService
        .apiThesesSupervisedGet(
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

  public onApplicationsCheck() {
    this.router.navigate(['supervisor', 'candidates', 'applications']);
  }

  public openCandidateDetails(candidateId: number): void {
    this.router.navigate(['supervisor', 'candidates', candidateId]);
  }
}
