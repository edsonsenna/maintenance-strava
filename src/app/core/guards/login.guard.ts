import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';

import { TokenService } from '../services/token.service';
import { TokenResponse } from '../interfaces/token-response';
import { TokenValues } from '../enums/token-values';
import { StravaService } from '../services/strava.service';
import { Collections } from '../enums/collections';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(
    private _stravaService: StravaService,
    private _tokenService: TokenService,
    private _router: Router,
    private _firestore: AngularFirestore
    ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
      if(Object.keys(next.queryParams).length) {
        console.log(next.queryParams);
        await this.getUserToken(next.queryParams?.code, next.queryParams?.scope);
      }

      console.log('Calling guard', next, state);
      return this._tokenService.isTokenValid 
        ? this._router.createUrlTree(['/maintenance'])
        : true;
  }

  async getUserToken(userCode: string, scope: string) {
    let athlete = null;
    if(userCode) {
      const receiveTokenReponse = {
        next: (response: TokenResponse) => {
          if(response.access_token && response.expires_in) {
            localStorage.setItem(TokenValues.TOKEN_KEY, response.access_token);
            // this.getUserInfo();
          }
          if(response.athlete) {
            athlete = response.athlete;
            const infoToBeAdd = this.parseResponse(response);
            this._firestore
              .collection(Collections.USERS)
              .doc(`${athlete.id}`)
              .update(
                {
                  ...infoToBeAdd
                }
              )
          }
          this._tokenService.save(response);
          console.log(response);
          console.log(athlete);
        }
      }
      return await this._stravaService
        .getAuthToken(userCode)
        .pipe(tap(receiveTokenReponse))
        .toPromise()
        .then(() => true)
        .catch(() => false);
    } else {
      // this.getUserInfo();
    }

    return Promise.resolve(false);
  }

  parseResponse(response: TokenResponse) {
    const info = {};
    info[TokenValues.TOKEN_KEY] = response.access_token;
    info[TokenValues.ATHLETE_INFO_KEY] = response.athlete;
    info[TokenValues.EXP_DATE_KEY] = response.expires_at;
    info[TokenValues.REFRESH_KEY] = response.refresh_token;
    return info;
  }
  
}
