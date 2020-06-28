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
  public title = 'maintenance-strava';
  public isLoader: boolean;
  public maintenances: Observable<any>;
  public mobileQuery: MediaQueryList;
  public menuOptions = [
    {
      path: '/home',
      name: 'Home'
    },
    {
      path: '/maintenance',
      name: 'Maintenances'
    }
  ]

  private _mobileQueryListener: () => void;
  private _routerSubscription: Subscription = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private angularFirestore: AngularFirestore,
    private _router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.routerEvents();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this._routerSubscription &&
      this._routerSubscription.unsubscribe();
  }

  routerEvents() {
    this._routerSubscription = this._router.events.subscribe((event: RouterEvent) => {
      if(event instanceof NavigationStart) {
        this.isLoader = true;
      } else if(event instanceof NavigationEnd) {
        this.isLoader = false;
      }
    });
  }
}
