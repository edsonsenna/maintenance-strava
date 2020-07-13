import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HarnessLoader } from '@angular/cdk/testing'; 
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

import { MaintenanceFormComponent } from './maintenance-form.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material.module';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';

describe('MaintenanceFormComponent', () => {
  let component: MaintenanceFormComponent;
  let fixture: ComponentFixture<MaintenanceFormComponent>;
  let loader: HarnessLoader
  let _route: Router;
  let _router: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceFormComponent ],
      providers: [
        FormBuilder,
        {
          provide: MaintenanceService,
          useValue: {
            setMaitenance: (userId, maintenace) => console.log(userId, maintenace)
          } 
        }
      ],
      imports: [
        AngularMaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ]
    })
    .compileComponents();

  }));

  beforeEach(async () => {
    _router = TestBed.get(Router);
    _route = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(MaintenanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form and be valid', () => {
    expect(component.form).not.toBeNull();
  })

  it('should create maintenance type select and be valid', fakeAsync(() => {
    
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    component.equipment.setValue(1);
    component.equipmentDistance.setValue(2000);
    component.equipmentName.setValue('Equipment 1');
    component.value.setValue(0);
    component.name.setValue('Chain change');
    component.type.setValue('hours');
    fixture.detectChanges();
    tick();

    const goalInput = fixture.debugElement.query(By.css('#hoursGoal')).nativeElement;
    expect(goalInput).not.toBeNull();
    expect(goalInput).not.toBeUndefined();
    goalInput.value = 50;
    goalInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    expect(component.form.valid).toBeTrue();
  }));

  it('should not create maintenance hours type when goal was not provided', fakeAsync(() => {
    
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    component.equipment.setValue(1);
    component.equipmentDistance.setValue(2000);
    component.equipmentName.setValue('Equipment 1');
    component.value.setValue(0);
    component.name.setValue('Chain change');
    fixture.detectChanges();
    tick();

    component.type.setValue('hours');
    component.onTypeSelect();
    fixture.detectChanges();
    tick();
    
    expect(component.form.invalid).toBeTrue();
  }));

  it('should not create maintenance date type when goal was not provided', fakeAsync(() => {
    
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    component.equipment.setValue(1);
    component.equipmentDistance.setValue(2000);
    component.equipmentName.setValue('Equipment 1');
    component.value.setValue(0);
    component.name.setValue('Chain change');
    fixture.detectChanges();
    tick();

    component.type.setValue('date');
    component.onTypeSelect();
    fixture.detectChanges();
    tick();

    expect(component.form.invalid).toBeTrue();
  }));
});
