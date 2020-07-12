import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MaintenanceFormComponent } from './maintenance-form.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material.module';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MaintenanceFormComponent', () => {
  let component: MaintenanceFormComponent;
  let fixture: ComponentFixture<MaintenanceFormComponent>;
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

  beforeEach(() => {
    _router = TestBed.get(Router);
    _route = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(MaintenanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
