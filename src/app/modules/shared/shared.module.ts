import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NonExistingPageComponent } from './non-existing-page/non-existing-page.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { TableModule } from 'primeng/table';
import {DividerModule} from 'primeng/divider';
import {CardModule} from 'primeng/card'
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  declarations: [TopBarComponent, HomePageComponent, NonExistingPageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    TieredMenuModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    PanelModule,
    TabViewModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    TreeSelectModule,
    TableModule,
    DividerModule,
    CardModule,
    AccordionModule
  ],
  exports: [
    TopBarComponent,
    HomePageComponent,
    NonExistingPageComponent,
    TranslateModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    TieredMenuModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    PanelModule,
    TabViewModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    TreeSelectModule,
    TableModule,
    DividerModule,
    CardModule,
    AccordionModule
  ],
})
export class SharedModule {
  constructor(txService: TranslateService, langService: LanguageService) {
    langService.lang$.subscribe((lang) => {
      txService.use(lang);
    });
  }
}
