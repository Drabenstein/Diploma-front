import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  areas:any[] = [];

  selectedAreas = [];

  constructor() {
      this.areas = [
          {name: 'New York', code: 'NY', inactive: false},
          {name: 'Rome', code: 'RM', inactive: true},
          {name: 'London', code: 'LDN', inactive: false},
          {name: 'Istanbul', code: 'IST', inactive: true},
          {name: 'Paris', code: 'PRS', inactive: false}
      ];
  }

  ngOnInit(): void {
  }

}
