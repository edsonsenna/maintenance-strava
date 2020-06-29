import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import * as MaintenanceValues from "../../../mocks/maintenance-values.json";
import { TokenService } from '../../../services/token.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Maintenance } from '../../../interfaces/maintenance';

@Component({
  selector: 'ms-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css'],
  providers: [MaintenanceService, TokenService, {provide: MAT_DATE_LOCALE, useValue: 'pt'},]
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
    private _maintenanceService: MaintenanceService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.createReactiveForm();
    this.getAndParseEquipments();
  }

  createReactiveForm() {
    this.maintenanceForm = this._formBuilder.group({
      id: [null],
      userId: [null],
      name: [null, Validators.required],
      type: [null, Validators.required],
      equipmentId: [null, Validators.required],
      equipmentDistance: [{ value: null, disabled: true}, Validators.required],
      equipmentName: [{ value: null, disabled: true}, Validators.required],
      maintenanceGoal: [null, Validators.required],
      value: [0]
    });

    this.user.setValue(this._tokenService.userId);
  }

  getAndParseEquipments() {
    this.equipmentsArr = this._route.snapshot.data["equipments"] || [];
    this.equipmentsArr = this.equipmentsArr.map(equipment => {
      equipment.distance = (equipment.distance / 1000).toFixed(0);
      return equipment;
    });
    console.log(this.equipmentsArr);
  }

  onEquipmentSelect() {
    const equipment = this.equipmentsArr.find(equipment => equipment.id === this.equipment.value) || null;
    this.equipmentDistance.setValue(equipment?.distance ? equipment.distance : null);
    this.equipmentDistance.updateValueAndValidity();
    this.equipmentName.setValue(equipment?.name ? equipment.name : null);
    this.equipmentName.updateValueAndValidity();
  }

  async onSubmit() {
    if(this.form.valid) {
      const maintenance: Maintenance = this.form.getRawValue();
      if(!maintenance.id) delete maintenance.id;
      maintenance.maintenanceGoal = Number(maintenance.maintenanceGoal * 1000);
      maintenance.equipmentDistance = Number(maintenance.equipmentDistance * 1000);;
      await this._maintenanceService.createMaitenance(this._tokenService.userId, maintenance);
      this._router.navigateByUrl('maintenance');
    } else {
      this.form.markAllAsTouched();
      return await Promise.resolve(false);
    }
    
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

  get equipmentName() {
    return this.maintenanceForm?.get('equipmentName') || null;
  }

  get maintenanceGoal() {
    return this.maintenanceForm?.get('maintenanceGoal') || null;
  }

  get equipments() {
    return this.equipmentsArr;
  }

}
