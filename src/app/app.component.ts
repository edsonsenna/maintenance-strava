import { Component, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}
