import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NonExistingPageComponent } from './non-existing-page/non-existing-page.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {TieredMenuModule} from 'primeng/tieredmenu';
@NgModule({
  declarations: [
    TopBarComponent,
    HomePageComponent,
    NonExistingPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    TieredMenuModule
  ],
  exports: [
    TopBarComponent,
    HomePageComponent,
    NonExistingPageComponent,
    TranslateModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    TieredMenuModule
  ]
})
export class SharedModule {
  constructor(txService: TranslateService, langService: LanguageService) {
    langService.lang$.subscribe((lang) => {
      txService.use(lang);;
    });
  }
 }
