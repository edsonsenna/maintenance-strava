import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _userForm: FormGroup = null;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createReactiveForm();
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
