import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import * as MaintenanceTypesJson from "../../../mocks/maintenance-values.json";
import { TokenService } from '../../../services/token.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Maintenance } from '../../../interfaces/maintenance';
import { MaintenanceTypes } from '../../../enums/maintenance-types';

@Component({
  selector: 'ms-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css'],
  providers: [TokenService, {provide: MAT_DATE_LOCALE, useValue: 'pt'}]
})
export class MaintenanceFormComponent implements OnInit {

  private maintenanceForm: FormGroup = null;
  private equipmentsArr: any[] = [];
  
  public types: any[] = MaintenanceTypesJson.values.types;
  public typesEnum: typeof MaintenanceTypes = MaintenanceTypes;
  public maintenance: Maintenance = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _tokenService: TokenService,
    private _maintenanceService: MaintenanceService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getAndParseEquipments();
    this.getAndParseMaintenance();
    this.createReactiveForm();
  }

  createReactiveForm() {

    const goalValue = this.maintenance?.type === this.typesEnum?.DATE ? new Date(this.maintenance?.goal) : this.maintenance?.goal;

    this.maintenanceForm = this._formBuilder.group({
      id: [this.maintenance?.id || null],
      type: [this.maintenance?.type || null, Validators.required],
      name: [this.maintenance?.name || null, Validators.required],
      equipmentId: [this.maintenance?.equipmentId || null, Validators.required],
      equipmentDistance: [{ value: this.maintenance?.equipmentDistance || null, disabled: true}, Validators.required],
      equipmentName: [{ value: this.maintenance?.equipmentName || null, disabled: true}, Validators.required],
      goal: [goalValue || null, Validators.required],
      value: [this.maintenance?.value || 0],
      isValid: [this.maintenance?.isValid || true]
    });
  }

  getAndParseEquipments() {
    this.equipmentsArr = this._route.snapshot.data["equipments"] || [];
    this.equipmentsArr = this.equipmentsArr.map(equipment => {
      equipment.distance = (equipment.distance / 1000).toFixed(0);
      return equipment;
    });
  }

  getAndParseMaintenance() {
    this.maintenance = this._route.snapshot.data["maintenance"] || null;
    if(this.maintenance) {
      this.maintenance.equipmentDistance /= 1000;
      if(this.maintenance?.type === this.typesEnum?.DISTANCE) {
        this.maintenance.goal /= 1000;
        this.maintenance.value /= 1000;
      } else if(this.maintenance?.type === this.typesEnum?.HOURS) {
        this.maintenance.goal /= 3600;
      }
    }
  }

  onTypeSelect() {
    this.goal.setValidators(Validators.required);
    this.goal.setValue(null);
    this.goal.updateValueAndValidity();
    if(this.type?.value === this.typesEnum?.DISTANCE) {
    const equipment = this.equipmentsArr.find(equipment => equipment.id === this.equipment.value) || null;
      this.value.setValue(equipment?.distance ? equipment.distance : null);
      this.value.updateValueAndValidity();
    } else {
      this.value.setValue(0);
      this.value.updateValueAndValidity();
    }
  }

  onEquipmentSelect() {
    this.goal.setValidators(Validators.required);
    const equipment = this.equipmentsArr.find(equipment => equipment.id === this.equipment.value) || null;
    if(this.type?.value === this.typesEnum?.DISTANCE) {
      this.value.setValue(equipment?.distance ? equipment.distance : null);
      this.value.updateValueAndValidity();
    } else {
      this.value.setValue(0);
      this.value.updateValueAndValidity();
    }
    this.equipmentDistance.setValue(equipment?.distance ? equipment.distance : null);
    this.equipmentDistance.updateValueAndValidity();
    this.equipmentName.setValue(equipment?.name ? equipment.name : null);
    this.equipmentName.updateValueAndValidity();
    this.goal.setValue(null);
    this.goal.updateValueAndValidity();
  }

  async onSubmit() {
    if(this.form.valid) {
      const maintenance: Maintenance = this.form.getRawValue();
      if(!maintenance.id) delete maintenance.id;
      maintenance.equipmentDistance = Number(maintenance.equipmentDistance) * 1000;
      if(maintenance.type === this.typesEnum?.DISTANCE) {
        maintenance.value = Number(maintenance.value) * 1000;
        maintenance.goal = Number(maintenance.goal) * 1000;
      }
      else if(maintenance.type === this.typesEnum?.DATE) {
        maintenance.goal = Number(`${Number(maintenance.goal)}`.padStart(13, '0'));
      } else if(maintenance.type === this.typesEnum?.HOURS) {
        maintenance.goal *= 3600;
      }
      await this._maintenanceService.setMaitenance(this._tokenService.userId, maintenance);
      this._router.navigateByUrl('maintenance');
    } else {
      this.form.markAllAsTouched();
      return await Promise.resolve(false);
    }
    
  }

  get form() {
    return this.maintenanceForm;
  }

  get name() {
    return this.maintenanceForm?.get('name') || null;
  }

  get type() {
    this.maintenanceForm?.get('type');
    return this.maintenanceForm?.get('type') || null;
  }

  get value() {
    return this.maintenanceForm?.get('value') || null;
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

  get goal() {
    return this.maintenanceForm?.get('goal') || null;
  }

  get equipments() {
    return this.equipmentsArr;
  }

}
