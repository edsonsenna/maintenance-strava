import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/user';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'ms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  private _userForm: FormGroup = null;
  private _user: User = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _route: ActivatedRoute,
    private _tokenService: TokenService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.receiveUserDetail();
    this.createReactiveForm();
  }

  receiveUserDetail(): void {
    this._user = this._route?.snapshot?.data?.userDetail ?? null;
  }

  createReactiveForm(): void {
    this._userForm = this._formBuilder.group({
      name: [
        this._user.name ?? '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(128),
        ],
      ],
      email: [this._user.email ?? '', [Validators.required, Validators.email]],
      birthdate: [
        this._user.birthdate ? new Date(this._user.birthdate) : new Date(),
        [Validators.required, Validators.nullValidator],
      ],
    });
  }

  async onUpdateClick(): Promise<boolean> {
    if (this.form.valid) {
      const formInfo = this.form.getRawValue();
      formInfo.birthdate = formInfo?.birthdate?.getTime();
      return this._userService
        .updateUser(this._tokenService.userId, formInfo)
        .then(() => {
          this._notificationService.showNotification(
            'user.detail.update.success',
            false
          );
          return true;
        })
        .catch(() => {
          this._notificationService.showNotification('problemToUpdate');
          return false;
        });
    }

    this.form.markAllAsTouched();
    return Promise.resolve(false);
  }

  get form() {
    return this._userForm;
  }

  get name() {
    return this.form?.get('name');
  }

  get email() {
    return this.form?.get('email');
  }

  get birthdate() {
    return this.form?.get('birthdate');
  }
}
