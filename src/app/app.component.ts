import { Component, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maintenance-strava';
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

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private angularFirestore: AngularFirestore
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.maintenances = this.angularFirestore.collection('users').doc("14255374").valueChanges();
    this.maintenances.subscribe((res) => console.log(res));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
