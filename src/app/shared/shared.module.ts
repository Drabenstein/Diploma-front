import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NonExistingPageComponent } from './non-existing-page/non-existing-page.component';



@NgModule({
  declarations: [
    TopBarComponent,
    HomePageComponent,
    NonExistingPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopBarComponent,
    HomePageComponent,
    NonExistingPageComponent
  ]
})
export class SharedModule { }
