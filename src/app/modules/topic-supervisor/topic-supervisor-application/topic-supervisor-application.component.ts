import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationsService } from 'src/app/generated';
import { ApplicationDetailsDto } from 'src/app/generated/model/applicationDetailsDto';

@Component({
  selector: 'app-topic-supervisor-application',
  templateUrl: './topic-supervisor-application.component.html',
  styleUrls: ['./topic-supervisor-application.component.scss'],
})
export class TopicSupervisorApplicationComponent implements OnInit {
  public application: ApplicationDetailsDto = null!;
  public isProposal: boolean = null!;
  private applicationId: number = null!;

  constructor(
    private applicationService: ApplicationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.applicationId = this.activatedRoute.snapshot.params['id'];
    this.isProposal = Boolean(
      this.activatedRoute.snapshot.paramMap.get('isProposal')
    );

    this.applicationService
      .apiApplicationsApplicationIdGet(this.applicationId)
      .subscribe((data) => {
        this.application = data;
      });
  }

  public onApply() {
    this.applicationService
      .apiApplicationsApplicationIdAcceptPost(this.applicationId)
      .subscribe((_) => {
        this.router.navigate(['supervisor', 'candidates', 'applications']);
      });
  }

  public onDeny() {
    this.applicationService
      .apiApplicationsApplicationIdRejectPost(this.applicationId)
      .subscribe((_) => {
        this.router.navigate(['supervisor', 'candidates', 'applications']);
      });
  }

  public onCancel() {
    this.router.navigate(['list', 'candidates', 'applications']);
  }
}
