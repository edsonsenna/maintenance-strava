import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '@enums/user-details';
import { UserDetail } from '@interfaces/user-detail';
import { UserService } from '@services/user.service';

@Component({
  selector: 'ms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _userForm: FormGroup = null;
  private _userDetail: UserDetail = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _userService:UserService,
  ) { }

  ngOnInit(): void {
    this.receiveUserDetail();
    this.createReactiveForm();
  }

  receiveUserDetail() {
    this._userDetail = this._route?.snapshot?.data?.userDetail || null;
    console.log(this._userDetail);
  }

  createReactiveForm() {

    this._userForm = this._formBuilder.group({
      name: [this._userDetail[UserDetails.FULLNAME_KEY], [Validators.required, Validators.minLength(2), Validators.maxLength(128)]], 
      email: [this._userDetail[UserDetails.EMAIL_KEY], [Validators.required, Validators.email]],
      birthday: [this._userDetail[UserDetails.BIRTHDAY_KEY] || Date.now(), [Validators.required, Validators.nullValidator]] 
    });

  }

  async onUpdateClick() {
    console.log(this.form.getRawValue());
    // TODO - Use use service to update user details on firebase
  }

  get form() {
    return this._userForm;
  }

}
