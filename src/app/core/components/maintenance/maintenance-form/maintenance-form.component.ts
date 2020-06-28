import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as MaintenanceValues from "../../../mocks/maintenance-values.json";
import { TokenService } from '../../../services/token.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Maintenance } from '../../../interfaces/maintenance';

@Component({
  selector: 'ms-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css'],
  providers: [MaintenanceService, TokenService]
})
export class MaintenanceFormComponent implements OnInit {

  private maintenanceForm: FormGroup = null;
  private equipmentsArr: any[] = [];
  private userId: number = null;
  
  public types: any[] = MaintenanceValues.values.types;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _tokenService: TokenService,
    private _maintenanceService: MaintenanceService
  ) { }

  async ngOnInit() {
    this.createReactiveForm();
    this.equipmentsArr = this._route.snapshot.data["equipments"] || [];
    console.log(this._tokenService.userId);
    const res = await this._maintenanceService.getMaintenanceById(this._tokenService.userId, null);
    console.log(res);
  }

  createReactiveForm() {
    this.maintenanceForm = this._formBuilder.group({
      id: [null],
      userId: [null],
      name: [null, Validators.required],
      type: [null, Validators.required],
      equipmentId: [null, Validators.required],
      equipmentDistance: [{ value: null, disabled: true}, Validators.required],
      maintenanceGoal: [null, Validators.required]
    });

    this.user.setValue(this._tokenService.userId);
  }

  onEquipmentSelect() {
    const equipment = this.equipmentsArr.find(equipment => equipment.id === this.equipment.value) || null;
    this.equipmentDistance.setValue(equipment?.distance ? equipment.distance : null);
    this.equipmentDistance.updateValueAndValidity();
  }

  async onSubmit() {
    const maintenance: Maintenance = this.form.getRawValue();
    const temp = {
      equipmentId: this.equipment?.value || null,
      initialValue: this.equipmentDistance?.value || null,
      maxValue: this.maintenanceGoal?.value || null,
      value: 0,
      type: this.type?.value || null,
      name: this.name?.value || null
    };

    await this._maintenanceService.createMaitenance(maintenance);
  }

  get form() {
    return this.maintenanceForm;
  }

  get user() {
    return this.maintenanceForm?.get('userId') || null;
  }

  get name() {
    return this.maintenanceForm?.get('name') || null;
  }

  get type() {
    return this.maintenanceForm?.get('type') || null;
  }

  get equipment() {
    return this.maintenanceForm?.get('equipmentId') || null;
  }

  get equipmentDistance() {
    return this.maintenanceForm?.get('equipmentDistance') || null;
  }

  get maintenanceGoal() {
    return this.maintenanceForm?.get('maintenanceGoal') || null;
  }

  get equipments() {
    return this.equipmentsArr;
  }

}
