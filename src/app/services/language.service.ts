import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public lang$ = new ReplaySubject<string>(1);

  constructor(private txService: TranslateService) {
    let lang = localStorage.getItem('language');
    if (lang === null || lang === undefined) {
      localStorage.setItem('language', 'pl');
      lang = 'pl';
    }
    this.lang$.next(lang);
  }

  public setLang(lang: string) {
    this.lang$.next(lang);
    localStorage.setItem('language', lang);
  }

  public getLang(): string {
    return this.txService.currentLang;
  }
}
