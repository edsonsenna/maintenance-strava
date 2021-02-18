import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/user';

@Component({
  selector: 'ms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _userForm: FormGroup = null;
  private _userDetail: User = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
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
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]], 
      email: ['', [Validators.required, Validators.email]],
      birthday: [Date.now, [Validators.required, Validators.nullValidator]] 
    });

  }

  onUpdateClick() {

    console.log(this.form.getRawValue());

  }

  get form() {
    return this._userForm;
  }

}
