import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AWSService } from 'src/app/generated';

@Component({
  selector: 'app-student-thesis',
  templateUrl: './student-thesis.component.html',
  styleUrls: ['./student-thesis.component.scss'],
})
export class StudentThesisComponent implements OnInit {
  public abstract: string = '';
  public abstractResult: string = '';
  public thesisTitlePl = 'Temat pracy dyplomowej po polsku';
  public thesisTitleEn = 'Temat pracy dyplomowej po angielsku';
  public reviews: any[] = [
    { author: 'Jan Kowalski', timestump: '11.11.2021 11:11:11', mark: '5.0' },
    {
      author: 'Krzysztof Iksiński',
      timestump: '11.11.2021 11:11:11',
      mark: '5.0',
    },
    { author: 'Janusz Nowak', timestump: '11.11.2021 11:11:11', mark: '5.0' },
  ];
  public events: any[] = [
    {
      author: 'Jan Kowalski',
      timestump: '11.11.2021 11:11:11',
      message: 'Wiadomość super zaawansowana',
    },
    {
      author: 'Krzysztof Iksiński',
      timestump: '11.11.2021 11:11:11',
      message: 'Wiadomość super zaawansowana',
    },
    {
      author: 'Janusz Nowak',
      timestump: '11.11.2021 11:11:11',
      message: 'Wiadomość super zaawansowana',
    },
  ];

  private thesisId: number = 0;
  constructor(private awsService: AWSService) {}

  ngOnInit(): void {}

  public onAbstractTranslate(): void {
    this.abstractResult =
      'ASDSDAS ADASDSA DASDASD SADDDDDDDDDDDD DDDDDDDDD DDDDDDDDD DDDDDDDDD DDDD DDDDDDDDDDDD DDDDDDDDDD DDDDDDDDDDDDDDDDD DDDDDDDDD DDDDD  DDDDD';
    this.awsService.apiAwsTranslateGet(this.abstract).subscribe((text) => {
      this.abstractResult = text;
    });
  }

  public onAbstractSentiment(): void {
    this.abstractResult =
      'ASDSDASADASDSADASDASDSADDDDDDD DDDDDDDDDDDDDDD DDDDDDDDDDDD  DDasdsadsadasdasdDDDDDDDDDDDD DDDDDDDDDDDDDDDDDDDDDDDD DDDDDDDDDDD DDDDDDDDDDDDDDDDDD';
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
}
