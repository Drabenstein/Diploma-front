import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-thesis',
  templateUrl: './student-thesis.component.html',
  styleUrls: ['./student-thesis.component.scss'],
})
export class StudentThesisComponent implements OnInit {

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
    { author: 'Jan Kowalski', timestump: '11.11.2021 11:11:11', message: 'Wiadomość super zaawansowana' },
    {
      author: 'Krzysztof Iksiński',
      timestump: '11.11.2021 11:11:11',
      message: 'Wiadomość super zaawansowana',
    },
    { author: 'Janusz Nowak', timestump: '11.11.2021 11:11:11', message: 'Wiadomość super zaawansowana' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
