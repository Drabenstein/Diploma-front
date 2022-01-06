import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    PasswordChangeComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
