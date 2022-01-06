import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NonExistingPageComponent } from './non-existing-page/non-existing-page.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';



@NgModule({
  declarations: [
    TopBarComponent,
    HomePageComponent,
    NonExistingPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TopBarComponent,
    HomePageComponent,
    NonExistingPageComponent,
    TranslateModule
  ]
})
export class SharedModule {
  constructor(txService: TranslateService, langService: LanguageService) {
    langService.lang$.subscribe((lang) => {
      txService.use(lang);;
    });
  }
 }
