import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/user';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'ms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _userForm: FormGroup = null;
  private _user: User = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _tokenService: TokenService,
    private _userService:UserService,
  ) { }

  ngOnInit(): void {
    this.receiveUserDetail();
    this.createReactiveForm();
  }

  receiveUserDetail() {
    this._user = this._route?.snapshot?.data?.userDetail || null;
    console.log(this._user);
  }

  createReactiveForm() {

    this._userForm = this._formBuilder.group({
      name: [this._user.fullname, [Validators.required, Validators.minLength(2), Validators.maxLength(128)]], 
      email: [this._user.email, [Validators.required, Validators.email]],
      birthdate: [this._user.birthdate || Date.now(), [Validators.required, Validators.nullValidator]] 
    });

  }

  async onUpdateClick() {
    console.log(this.form.getRawValue());
    if(this.form.valid) {
      return this._userService.updateUser(this._tokenService.userId, this.form.getRawValue());
    }

    this.form.markAllAsTouched();
    // TODO - Use use service to update user details on firebase
  }

  get form() {
    return this._userForm;
  }

}
