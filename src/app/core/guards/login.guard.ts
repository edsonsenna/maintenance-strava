import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';

import { TokenService } from '@services/token.service';
import { TokenResponse } from '@interfaces/token-response';
import { TokenValues } from '@enums/token-values';
import { StravaService } from '@services/strava.service';
import { Collections } from '@enums/collections';
import { NotificationService } from '@services/notification.service';
import { User } from '@interfaces/user';
import { UserDetails } from '@enums/user-details';
import { Athlete } from '@interfaces/athlete';
import { AthleteStrava } from '@interfaces/athlete-strava';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private user: User = {};
  constructor(
    private _stravaService: StravaService,
    private _tokenService: TokenService,
    private _router: Router,
    private _firestore: AngularFirestore,
    private _notificationService: NotificationService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (Object.keys(next.queryParams).length) {
      let isInvalid = false;
      if (next?.queryParams?.error) {
        this._notificationService.showNotification('login');
        isInvalid = true;
      } else if (
        next?.queryParams?.scope != 'read,activity:read_all,profile:read_all'
      ) {
        this._notificationService.showNotification('invalidScope');
        isInvalid = true;
      }
      if (isInvalid) return this._router.createUrlTree(['/login']);
      await this.getUserToken(next.queryParams?.code, next.queryParams?.scope);
    } else if (!this._tokenService.isTokenValid && this._tokenService.userId) {
      let refreshToken = null;
      await this._firestore
        .collection(Collections.USERS)
        .doc(`${this._tokenService.userId}`)
        .get()
        .pipe(
          tap((doc) => {
            if (doc.exists) {
              const userInfo: User = doc.data();
              refreshToken = userInfo.refreshToken;
              this.user = { ...this.user, ...userInfo };
            }
          })
        )
        .toPromise();

      if (refreshToken) {
        console.log(this.user);
        await this._stravaService
          .getAuthTokenByRefresh(refreshToken)
          .pipe(
            tap(
              (response: TokenResponse) => {
                if (response?.access_token) {
                  const infoToBeAdd = this.parseResponse(response);
                  this.user.name =
                    this.user.name ??
                    `${infoToBeAdd.athlete.firstname} ${infoToBeAdd.athlete.lastname}`;
                  this._firestore
                    .collection(Collections.USERS)
                    .doc(`${this._tokenService.userId}`)
                    .update({
                      ...infoToBeAdd,
                      ...this.user,
                    });
                  this._tokenService.save(response);
                }
              },
              (error) => {
                if (error) {
                  this._tokenService.clearAllTokens();
                }
              }
            )
          )
          .toPromise()
          .then(() => true)
          .catch(() => false);
      }
    }

    return this._tokenService.isTokenValid
      ? this._router.createUrlTree(['/maintenance'])
      : true;
  }

  async getUserToken(userCode: string, scope: string) {
    let athlete = null;

    await this._firestore
      .collection(Collections.USERS)
      .doc(`${this._tokenService.userId}`)
      .get()
      .pipe(
        tap((doc) => {
          if (doc.exists) {
            const userInfo: User = doc.data();
            this.user = { ...this.user, ...userInfo };
          }
        })
      )
      .toPromise();

    if (userCode) {
      const receiveTokenReponse = {
        next: (response: TokenResponse) => {
          if (response.access_token && response.expires_in) {
            localStorage.setItem(TokenValues.TOKEN_KEY, response.access_token);
          }
          if (response.athlete) {
            athlete = response.athlete;
            const infoToBeAdd = this.parseResponse(response);
            this.user.name =
              this.user.name ??
              `${infoToBeAdd.athlete.firstname} ${infoToBeAdd.athlete.lastname}`;
            console.log(this.user);
            this._firestore
              .collection(Collections.USERS)
              .doc(`${athlete.id}`)
              .set({
                ...infoToBeAdd,
                ...this.user,
              });
          }
          this._tokenService.save(response);
        },
      };
      return await this._stravaService
        .getAuthToken(userCode)
        .pipe(tap(receiveTokenReponse))
        .toPromise()
        .then(() => true)
        .catch(() => false);
    }

    return Promise.resolve(false);
  }

  parseResponse(response: TokenResponse) {
    const info: User = {};
    if (response?.access_token) {
      info.token = response?.access_token;
    }
    if (response?.athlete) {
      info.athlete = this.parseAthleteStravaObj(response.athlete);
    }
    if (response?.expires_at) {
      info.expirationDate = response.expires_at;
    }
    if (response?.refresh_token) {
      info.refreshToken = response.refresh_token;
    }
    return info;
  }

  parseAthleteStravaObj(athleteStravaObj: AthleteStrava): Athlete {
    const keys = Object.keys(athleteStravaObj);
    const parsedObject = keys.reduce((accumulator, currentKey) => {
      const camelCaseKey = this.snakeToCamel(currentKey);
      accumulator[camelCaseKey] = athleteStravaObj[currentKey];
      return accumulator;
    }, {});
    return parsedObject;
  }

  snakeToCamel = (str: string): string =>
    str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );
}
