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

  public isLoader: boolean;
  public mobileQuery: MediaQueryList; 
  public title = 'maintenance-strava';
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
    private route: ActivatedRoute,
    private _stravaService: StravaService,
    private cookieService: CookieService,
    private userService: UserService,
    private tokenService: TokenService,
    private _firestore: AngularFirestore,
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

  async getUserEquipmentsAndUpdate() {
    const equipments = await this._stravaService.getAuthenticadedUserBikes()
    equipments.forEach(equipment => {
      this.updateMaintenanceData(equipment);
    })
    console.log(equipments);
  }

  updateMaintenanceData(equipment) {
    this._firestore
      .collection(Collections.USERS)
      .doc(`${this.tokenService.userId}`)
      .collection(Collections.MAINTENANCES)
      .ref
      .where('equipmentId', '==', equipment.id)
      .get()
      .then(values => {
        values.forEach(value => {
          const data = value.data();
          const difference = equipment.distance - data.equipmentDistance;
          value.ref.update({ value: difference > 0 ? difference : 0 });
          console.log(equipment.id + ' / ', value.data());
        });
      })
  }

  receiveQueryParams() {

    this.route
      .queryParams
      .pipe(filter(params => params.code))
      .subscribe(params => {
        this.userCode = params?.code;
      });

  }

  async getUserToken() {
    if(this.userCode) {
      const receiveTokenReponse = {
        next: (response: TokenResponse) => {
          if(response.access_token && response.expires_in) {
            localStorage.setItem(AUTH_TOKEN, response.access_token);
            this.getUserInfo();
          }
          if(response.athlete) {
            this.athlete = response.athlete;
          }
          this.tokenService.save(response);
          console.log(response);
          console.log(this.athlete);
        }
      }
      return await this._stravaService
        .getAuthToken(this.userCode)
        .pipe(tap(receiveTokenReponse))
        .toPromise()
        .then(() => true)
        .catch(() => false);
    } else {
      this.getUserInfo();
    }

    return Promise.resolve(false);
  }

  async getUserInfo() {
    const receiveUser = {
      next: (user) => {
        console.log('User ', user);
        if(user) {
          this.updateUser(user.id, user.bikes);
        }
      },
      error: (err) => {
        console.log(err);
      }
    }

    return await this._stravaService
        .getAuthenticadedUser()
        .pipe(tap(receiveUser))
        .toPromise()
        .then(() => true)
        .catch(() => false);
  }

  async findUser() {
    if(this.athlete) {
      this.user = await this.userService.findUserById(`${this.athlete.id}`);
      console.log('User by Id', this.user);
    }
  }

  async createUser() {
    this.user = {
      created: new Date(),
      update: new Date(),
      athlete: this.athlete
    };

    const userCreated = await this.userService.createUser(this.user);
    console.log('Creating' + userCreated);
  }

  async updateUser(userId: string, bikes: []) {
    await this.userService.updateUser(userId, bikes);
  }

}
