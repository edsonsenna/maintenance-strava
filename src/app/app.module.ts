import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularMaterialModule } from './core/modules/angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { HttpIntercept } from './core/interceptors/http-intercept.interceptor';

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
  HttpClientModule
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
export class AppModule {}
