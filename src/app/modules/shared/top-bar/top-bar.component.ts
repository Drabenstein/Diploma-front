import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  constructor(private router: Router) {}

  public items: MenuItem[] = [];
  public sideItems: MenuItem[] = [];
  public name: string = "Jan Kowalski"

  public ngOnInit() {
    this.items = [
      {
        label: 'Lista tematów',
        icon: 'pi pi-fw pi-list',
        command: () => this.openTopicList(),
      },
      {
        label: 'Moja praca',
        icon: 'pi pi-fw pi-book',
        command: () => this.openMyThesis(),
      },
      {
        label: 'Moje tematy',
        icon: 'pi pi-fw pi-folder',
        command: () => this.openMyTopics(),
      },
      {
        label: 'Moi dyplomanci',
        icon: 'pi pi-fw pi-users',
        command: () => this.openMyStudents(),
      },
      {
        label: 'Moje recenzje',
        icon: 'pi pi-fw pi-id-card',
        command: () => this.openMyReviews(),
      },
      {
        label: 'Przydział recenzentów',
        icon: 'pi pi-fw pi-briefcase',
        command: () => this.openReviewAssigment(),
      },
      {
        label: 'Zatwierdzanie tematów',
        icon: 'pi pi-fw pi-flag',
        command: () => this.openTopicApproval(),
      },
    ];

    this.sideItems = [
      {
        label: 'Zmień hasło',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.openPasswordChange(),
      },
      {
        label: 'Moje dane',
        icon: 'pi pi-fw pi-tag',
        command: () => this.openMyDetails(),
      },
      {
        label: 'Wyloguj',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      },

    ];
  }

  private logout(): void {
    throw new Error('Method not implemented.');
  }
  private openMyDetails(): void {
    this.router.navigate(['user']);
  }
  private openPasswordChange(): void {
    this.router.navigate(['user', "password"]);
  }
  private openTopicList(): void {
    this.router.navigate(['list']);
  }

  private openMyThesis(): void {
    this.router.navigate(['thesis']);
  }

  private openMyTopics(): void {
    this.router.navigate(['supervisor']);
  }

  private openMyStudents(): void {
    this.router.navigate(['supervisor', 'candidates']);
  }

  private openMyReviews(): void {
    this.router.navigate(['reviewer']);
  }

  private openReviewAssigment(): void {
    this.router.navigate(['review-assigments']);
  }

  private openTopicApproval(): void {
    this.router.navigate(['approval']);
  }
}


