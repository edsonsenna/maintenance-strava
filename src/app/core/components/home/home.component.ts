import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { StravaService } from '@services/strava.service';
import { Athlete } from '@interfaces/athlete';
import { User } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import routes from '@routes/routes';

const AUTH_TOKEN = 'ms-auth-token';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StravaService, UserService],
})
export class HomeComponent implements OnInit {
  private userCode: string = null;
  private athlete: Athlete = null;

  public user: User = null;
  public isLoader: boolean = false;
  public mobileQuery: MediaQueryList;
  public title = 'maintenance-strava';
  public menuOptions = [
    {
      path: routes.MAINTENANCE_LIST,
      name: 'maintenances',
    },
    {
      path: routes.USER_INFO,
      name: 'user',
    },
  ];
  public userInfoRoute: String = routes.USER_INFO;
  public isUserInfoRouteActive: Boolean = false;

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

  async ngOnInit(): Promise<void> {
    this.routerEvents();
    await this.receiveUserInfo();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this._routerSubscription && this._routerSubscription.unsubscribe();
  }

  routerEvents() {
    this.isUserInfoRouteActive = this._router.isActive(routes.USER_INFO, true);
    this._routerSubscription = this._router.events.subscribe(
      (event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.isLoader = true;
        } else if (event instanceof NavigationEnd) {
          this.isLoader = false;
          this.receiveUserInfo();
          this.isUserInfoRouteActive = this._router.isActive(routes.USER_INFO, true);
        }
      }
    );
  }

  async receiveUserInfo() {
    const userInfo: User = await this._userService
      .findUserById(this._tokenService.userId)
      .then((user) => user)
      .catch(() => null);
    this.user = {
      ...this.user,
      ...userInfo,
    };
  }

  exit() {
    this._tokenService.clearAllTokens();
    const urlTree = this._router.createUrlTree([routes.LOGIN]);
    this._router.navigateByUrl(urlTree);
  }

  get userFirstName() {
    return this._tokenService.userFirstName;
  }

  get shouldDisplayEmailNotFoundContainer() {
    return !this.isUserInfoRouteActive && this.user && !this.user?.email;
  }
}
