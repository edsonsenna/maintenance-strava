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

import { TokenService } from '../services/token.service';
import { TokenResponse } from '../interfaces/token-response';
import { TokenValues } from '../enums/token-values';
import { StravaService } from '../services/strava.service';
import { Collections } from '../enums/collections';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
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
      if(next?.queryParams?.error) {
        this._notificationService.showNotification('login');
        isInvalid = true;
      } else if(next?.queryParams?.scope != 'read,activity:read_all,profile:read_all') {
        this._notificationService.showNotification('invalidScope');
        isInvalid = true;
      }
      if(isInvalid) return this._router.createUrlTree(['/login']);
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
              const data = doc.data();
              refreshToken = data[TokenValues.REFRESH_KEY];
            }
          })
        )
        .toPromise();

      if (refreshToken) {
        await this._stravaService
          .getAuthTokenByRefresh(refreshToken)
          .pipe(
            tap(
              (response: TokenResponse) => {
                if (response?.access_token) {
                  const infoToBeAdd = this.parseResponse(response);
                  this._firestore
                    .collection(Collections.USERS)
                    .doc(`${this._tokenService.userId}`)
                    .update({
                      ...infoToBeAdd,
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
          .then((response) => true)
          .catch((error) => false);
      }
    }

    return this._tokenService.isTokenValid
      ? this._router.createUrlTree(['/maintenance'])
      : true;
  }

  async getUserToken(userCode: string, scope: string) {
    let athlete = null;
    if (userCode) {
      const receiveTokenReponse = {
        next: (response: TokenResponse) => {
          if (response.access_token && response.expires_in) {
            localStorage.setItem(TokenValues.TOKEN_KEY, response.access_token);
          }
          if (response.athlete) {
            athlete = response.athlete;
            const infoToBeAdd = this.parseResponse(response);
            this._firestore
              .collection(Collections.USERS)
              .doc(`${athlete.id}`)
              .set({
                ...infoToBeAdd,
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
    const info = {};
    if (response?.access_token) {
      info[TokenValues.TOKEN_KEY] = response?.access_token;
    }
    if (response?.athlete) {
      info[TokenValues.ATHLETE_INFO_KEY] = response?.athlete;
    }
    if (response?.expires_at) {
      info[TokenValues.EXP_DATE_KEY] = response?.expires_at;
    }
    if (response?.refresh_token) {
      info[TokenValues.REFRESH_KEY] = response?.refresh_token;
    }
    return info;
  }
}
