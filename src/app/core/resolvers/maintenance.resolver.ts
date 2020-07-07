import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { TokenService } from '../services/token.service';
import { MaintenanceService } from '../services/maintenance.service';


@Injectable({ providedIn: 'root' })
export class MaintenanceResolver implements Resolve<any> {

    constructor(
        private _tokenService: TokenService,
        private _maintenanceService: MaintenanceService
        ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const maintenanceId = route?.params?.id || null;
        return maintenanceId
            ? this._maintenanceService.getMaintenanceById(this._tokenService.userId, maintenanceId) 
            : null;
    }

}