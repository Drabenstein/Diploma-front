import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [

  { path: 'password', component: PasswordChangeComponent },

  { path: '', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
