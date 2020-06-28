import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as MaintenanceValues from "../../../mocks/maintenance-values.json";

@Component({
  selector: 'ms-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {

  private maintenanceForm: FormGroup = null;
  private equipmentsArr: any[] = [];
  
  public types: any[] = MaintenanceValues.values.types;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createReactiveForm();
    this.equipmentsArr = this._route.snapshot.data["equipments"] || [];
  }

  createReactiveForm() {
    this.maintenanceForm = this._formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      type: [null, Validators.required],
      equipmentId: [null, Validators.required],
      equipmentDistance: [{ value: null, disabled: true}, Validators.required],
      maintenanceGoal: [null, Validators.required]
    });
  }

  onEquipmentSelect() {
    const equipment = this.equipmentsArr.find(equipment => equipment.id === this.equipment.value) || null;
    this.equipmentDistance.setValue(equipment?.distance ? equipment.distance : null);
    this.equipmentDistance.updateValueAndValidity();
  }

  get form() {
    return this.maintenanceForm;
  }

  get name() {
    return this.maintenanceForm.get('name');
  }

  get equipment() {
    return this.maintenanceForm.get('equipmentId');
  }

  get equipmentDistance() {
    return this.maintenanceForm.get('equipmentDistance');
  }

  get equipments() {
    return this.equipmentsArr;
  }

}
