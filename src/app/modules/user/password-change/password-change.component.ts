import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChangePasswordRequest, UsersService } from 'src/app/generated';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {
  public formGroup: FormGroup;
  public model: PasswordChange = {
    newPassword: '',
    newPasswordRepeat: '',
  };
  private translatedData: Record<string, string> = {};

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formGroup = this.fb.group({
      newPassword: new FormControl(null, [Validators.required]),
      newPasswordRepeat: new FormControl(null, [Validators.required]),
    });
  }

  public ngOnInit(): void {
    this.translateService
      .get([
        'CONFIRMATION.MESSAGE',
        'CONFIRMATION.YES',
        'CONFIRMATION.NO',
        'CONFIRMATION.MESSAGE',
        'CONFIRMATION.ERROR',
        'CONFIRMATION.SUCCESS_MESSAGE',
        'CONFIRMATION.ERROR_MESSAGE',
      ])
      .subscribe((data: Record<string, string>) => {
        this.translatedData = data;
      });
  }

  public isPasswordMatching(): boolean {
    if (this.model.newPassword === this.model.newPasswordRepeat) {
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

  public onPasswordChange(event: Event) {
    this.confirmationService.confirm({
      acceptLabel: this.translatedData['CONFIRMATION.YES'],
      rejectLabel: this.translatedData['CONFIRMATION.NO'],
      target: event.target!,
      message: this.translatedData['CONFIRMATION.MESSAGE'],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.changePasword();
      },
      reject: () => this.confirmationService.close(),
    });
  }

  private changePasword(): void {
    const passwordDto: ChangePasswordRequest = {
      password: this.model.newPassword,
    };

    this.userService.apiUsersChangePasswordPut(passwordDto).subscribe({
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translatedData['MESSAGE.ERROR'],
          detail: this.translatedData['MESSAGE.ERROR_MESSAGE'],
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translatedData['MESSAGE.SUCCESS'],
          detail: this.translatedData['MESSAGE.SUCCESS_MESSAGE'],
        });
        this.model.newPassword = '';
        this.model.newPasswordRepeat = '';
      },
    });
  }
}

export interface PasswordChange {
  newPassword?: string;
  newPasswordRepeat?: string;
}
