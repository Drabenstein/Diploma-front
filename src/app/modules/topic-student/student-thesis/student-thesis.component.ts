import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApplicationsService,
  AWSService,
  ThesesService,
  TopicsService,
} from 'src/app/generated';
import { ApprovedTopicDto } from 'src/app/generated/model/approvedTopicDto';
import { MyThesisDto } from 'src/app/generated/model/myThesisDto';

@Component({
  selector: 'app-student-thesis',
  templateUrl: './student-thesis.component.html',
  styleUrls: ['./student-thesis.component.scss'],
})
export class StudentThesisComponent implements OnInit {
  public abstract: string = '';
  public abstractResult: string = '';
  public myThesis: MyThesisDto = null!;
  public myAcceptedTopics: ApprovedTopicDto[] = [];
  public thesisId: number = null!;
  constructor(
    private awsService: AWSService,
    private topicService: TopicsService,
    private thesisService: ThesesService,
    private applicationService: ApplicationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.topicService.apiTopicsMyAcceptedTopicsGet().subscribe((data) => {
      this.myAcceptedTopics = data;
    });

    this.thesisService.apiThesesGetThesisIdGet().subscribe((id) => {
      this.thesisId = id;
      if (this.thesisId !== 0) {
        this.thesisService.apiThesesMyThesisGet().subscribe((thesis) => {
          this.myThesis = thesis;
        });
      }
    });
  }

  public onAbstractTranslate(): void {
    this.awsService.apiAwsTranslateGet(this.abstract).subscribe((text) => {
      this.abstractResult = text;
    });
  }

  public onUploadThesis(event: any): void {
    let uploadedFile: File;
    let fileReader = new FileReader();
    for (let file of event.files) {
      uploadedFile = file;
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        let uploadedFileString: any = fileReader.result;
        console.log(uploadedFileString);
        this.awsService
          .apiAwsUploadThesisPost(this.thesisId, uploadedFileString)
          .subscribe();
      };
    }
  }

  public onDownloadThesis(): void {
    this.awsService.apiAwsDownloadThesisGet(this.thesisId).subscribe();
  }

  public onDeleteThesis(): void {
    this.awsService.apiAwsDeleteThesisDelete(this.thesisId).subscribe();
  }

  public onConfirmTopic(applicationId: number): void {
    this.applicationService
      .apiApplicationsApplicationIdConfirmPost(applicationId)
      .subscribe((_) => {
        window.location.reload;
      });
  }

  public onSendDeclaration() {
    this.router.navigate(['thesis', 'declaration', {thesisId: this.thesisId}]);
  }
}
