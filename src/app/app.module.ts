import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { AngularMaterialModule } from './core/modules/angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { HttpIntercept } from './core/interceptors/http-intercept.interceptor';
import { MaintenanceModule } from './core/components/maintenance/maintenance.module';
import { HttpLoaderFactory } from './core/loaders/http-i18n-loader';

const declarations = [
  AppComponent,
  LoginComponent,
  HomeComponent
]

const imports = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule,
  AngularMaterialModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  MaintenanceModule,
  HttpClientModule,
  TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
})
]

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpIntercept,
    multi: true,
  }
]

@NgModule({
  declarations: [
    ...declarations
  ],
  imports: [
    ...imports
  ],
  providers: [...providers],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    // TODO: Get user client language as default language 
    translateService.setDefaultLang('pt-br');
    translateService.use('en-us');
  }
}
