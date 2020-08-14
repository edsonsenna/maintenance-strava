import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { StravaService } from '../../services/strava.service';
import { TokenResponse } from '../../interfaces/token-response';
import { Athlete } from '../../interfaces/athlete';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Collections } from '../../enums/collections';

const AUTH_TOKEN = 'ms-auth-token';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StravaService, UserService]
})
export class HomeComponent implements OnInit {

  private userCode: string = null;
  private athlete: Athlete = null;
  private user: User = null;

  public isLoader: boolean = false;
  public mobileQuery: MediaQueryList; 
  public title = 'maintenance-strava';
  public menuOptions = [
    {
      path: '/maintenance',
      name: 'maintenances'
    },
    {
      path: '/user',
      name: 'user'
    }
  ]
  
  private _mobileQueryListener: () => void;
  private _routerSubscription: Subscription = null;

  constructor(
    private _userService: UserService,
    private _tokenService: TokenService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
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

  exit() {
    this._tokenService.clearAllTokens();
    const urlTree = this._router.createUrlTree(['login']);
    this._router.navigateByUrl(urlTree);
  }

  get userFirstName() {
    return this._tokenService.userFirstName;
  }

}
