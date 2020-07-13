import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
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
        TranslateModule.forRoot()
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

  it('should create maintenance type select and be valid', async () => {
    component.types = [
      {
          "name": "distance",
          "value": "distance"
      },
      {
          "name": "date",
          "value": "date"
      },
      {
          "name": "hours",
          "value": "hours"
      }
    ]
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.type).not.toBeNull();

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const hoursOption = await select.getOptions() || null;
    expect(hoursOption.length).toBeGreaterThan(0);
    if(hoursOption) {
      await hoursOption[2].click();
      expect(component.type.value).toBe('hours');

    }
    
  })
});
