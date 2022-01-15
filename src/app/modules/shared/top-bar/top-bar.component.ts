import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  public items: MenuItem[] = [];
  public sideItems: MenuItem[] = [];
  public name: string = '';
  private translatedData: Record<string, string> = {};
  private roles: string[] = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private langService: LanguageService,
    private translateService: TranslateService
  ) {}

  public ngOnInit() {
    this.translateService
      .get([
        'TOP_BAR.TOPICS_LIST',
        'TOP_BAR.MY_THESIS',
        'TOP_BAR.MY_TOPICS',
        'TOP_BAR.MY_CANDIDATES',
        'TOP_BAR.MY_REVIEWS',
        'TOP_BAR.REVIEWERS_ASSIGN',
        'TOP_BAR.TOPIC_APPROVAL',
        'TOP_BAR.PASSWORD_CHANGE',
        'TOP_BAR.USER_DETAILS',
        'TOP_BAR.LOGOUT',
      ])
      .subscribe((data: Record<string, string>) => {
        this.translatedData = data;
        this.authService.isAuthenticated$.subscribe((auth) => {
          if (auth) {
            this.authService.user$.subscribe((user) => {
              this.name = user?.given_name + ` ` + user?.family_name!;
              this.roles = user?.['https://localhost:5001/api/roles'];
              this.loadTopMenuItems();
              this.loadUserMenuItems();
            });
          }
        });
      });
  }

  public onSwitchLanguage() {
    const currentLang = this.langService.getLang();
    if (currentLang === 'pl') {
      this.langService.setLang('en');
    } else {
      this.langService.setLang('pl');
    }
    window.location.reload();
  }

  public login(): void {
    this.authService.loginWithRedirect();
  }

  private loadTopMenuItems() {
    const userItems: MenuItem[] = [];
    if (this.roles.includes('student')) {
      userItems.push({
        label: this.translatedData['TOP_BAR.TOPICS_LIST'],
        icon: 'pi pi-fw pi-list',
        command: () => this.openTopicList(),
      });
    }
    if (this.roles.includes('student')) {
      userItems.push({
        label: this.translatedData['TOP_BAR.MY_THESIS'],
        icon: 'pi pi-fw pi-book',
        command: () => this.openMyThesis(),
      });
    }
    if (this.roles.includes('tutor')) {
      userItems.push({
        label: this.translatedData['TOP_BAR.MY_TOPICS'],
        icon: 'pi pi-fw pi-tag',
        command: () => this.openMyTopics(),
      });
    }
    if (this.roles.includes('tutor')) {
      userItems.push({
        label: this.translatedData['TOP_BAR.MY_CANDIDATES'],
        icon: 'pi pi-fw pi-users',
        command: () => this.openMyStudents(),
      });
    }
    if (this.roles.includes('tutor')) {
      userItems.push({
        label: this.translatedData['TOP_BAR.MY_REVIEWS'],
        icon: 'pi pi-fw pi-briefcase',
        command: () => this.openMyReviews(),
      });
    }
    if (this.roles.includes('program-committee')) {
      userItems.push({
        label: this.translatedData['TOP_BAR.REVIEWERS_ASSIGN'],
        icon: 'pi pi-fw pi-id-card',
        command: () => this.openReviewAssigment(),
      });
    }
    if (this.roles.includes('program-committee')) {
      userItems.push({
        label: this.translatedData['TOP_BAR.TOPIC_APPROVAL'],
        icon: 'pi pi-fw pi-flag',
        command: () => this.openTopicApproval(),
      });
    }
    this.items = userItems;
  }

  private loadUserMenuItems() {
    this.sideItems = [
      {
        label: this.translatedData['TOP_BAR.PASSWORD_CHANGE'],
        icon: 'pi pi-fw pi-pencil',
        command: () => this.openPasswordChange(),
      },
      {
        label: this.translatedData['TOP_BAR.USER_DETAILS'],
        icon: 'pi pi-fw pi-folder',
        command: () => this.openMyDetails(),
      },
      {
        label: this.translatedData['TOP_BAR.LOGOUT'],
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      },
    ];
  }

  private logout(): void {
    this.authService.logout({ returnTo: window.location.origin });
  }
  private openMyDetails(): void {
    this.router.navigate(['user']);
  }
  private openPasswordChange(): void {
    this.router.navigate(['user', 'password']);
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
