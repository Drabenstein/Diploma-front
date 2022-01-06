import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public lang$ = new ReplaySubject<string>(1);

  constructor() {
    this.lang$.next('pl');
  }

  public setLang(lang: string) {
    this.lang$.next(lang);
  }
}
