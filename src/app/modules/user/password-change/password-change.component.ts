import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent {
  public formGroup: FormGroup;
  public model: PasswordChange = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  };

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      oldPassword: new FormControl(null, [Validators.required,]),
      newPassword: new FormControl(null, [Validators.required]),
      newPasswordRepeat: new FormControl(null, [Validators.required]),
    });
  }

  public isPasswordMatching(): boolean {
    if (
      this.model.newPassword === this.model.newPasswordRepeat
    ) {
      return true;
    } else {
      return false;
    }
  }

  public isButtonDisabled(): boolean {
    if (
      this.model.newPassword === '' ||
      this.model.newPassword === null ||
      this.model.newPassword === undefined ||
      this.model.newPassword !== this.model.newPasswordRepeat
    ) {
      return true;
    } else {
      return false;
    }
  }

}

export interface PasswordChange {
  oldPassword?: string;
  newPassword?: string;
  newPasswordRepeat?: string;
}
