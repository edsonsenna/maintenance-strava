import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './core/modules/angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';

const declarations = [
  AppComponent,
  LoginComponent
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

@NgModule({
  declarations: [
    ...declarations,
    HomeComponent
  ],
  imports: [
    ...imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
