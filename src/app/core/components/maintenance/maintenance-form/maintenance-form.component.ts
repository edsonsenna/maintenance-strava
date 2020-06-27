import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {

  private maintenanceForm: FormGroup = null;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createReactiveForm();
  }

  createReactiveForm() {
    this.maintenanceForm = this.formBuilder.group({
      id: [null],
      name: [null]
    });
  }

  get form() {
    return this.maintenanceForm;
  }

}
