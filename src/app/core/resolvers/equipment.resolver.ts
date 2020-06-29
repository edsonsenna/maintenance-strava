import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StravaService } from '../services/strava.service';

@Injectable({ providedIn: 'root' })
export class EquipmentResolver implements Resolve<any> {

    constructor(private _stravaService: StravaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._stravaService.getAuthenticadedUserBikes();
    }

}