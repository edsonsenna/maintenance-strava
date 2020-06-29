import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';


const STRAVA_AUTH_URL = environment.stravaConfig.stravaAuthUrl;
const STRAVA_API_URL = environment.stravaConfig.stravaBaseApiUrl;
const CLIENT_ID_PARAM = environment.stravaConfig.clientId;
const CLIENT_SECRET_PARAM = environment.stravaConfig.clientSecret
const GRANT_TYPE = environment.stravaConfig.grantType;

@Injectable({
    providedIn: 'root'
})
export class StravaService {

    constructor(private http: HttpClient) { }

    getAuthToken(userCode: string) {
        return this.http
            .post(`${STRAVA_AUTH_URL}token?client_id=${CLIENT_ID_PARAM}&client_secret=${CLIENT_SECRET_PARAM}&code=${userCode}&${GRANT_TYPE}`, {});
    }

    getAuthenticadedUser() {
        return this.http
            .get(`${STRAVA_API_URL}/athlete`);
    }

    async getAuthenticadedUserBikes() {
        return await this.http
            .get(`${STRAVA_API_URL}/athlete`)
            .toPromise().then((user: any) => {
                return user?.bikes ? user.bikes : [];
            });
        const mockedArr = [{ "id": "b4605516", "primary": true, "name": "Caloi Strada", "resource_state": 2, "distance": 13475877 }, { "id": "b4756972", "primary": false, "name": "REDSTONE MACROPUS", "resource_state": 2, "distance": 3865209 }, { "id": "b2751456", "primary": false, "name": "TSW JUMP 29ER", "resource_state": 2, "distance": 4930570 }, { "id": "b3732174", "primary": false, "name": "TSW JUMP 29ER UPGRADE", "resource_state": 2, "distance": 3480580 }];
        return await of(mockedArr).toPromise().then(() => mockedArr);
        return await this.http
            .get(`${STRAVA_API_URL}/athlete`)
            .toPromise().then((user: any) => {
                return user?.bikes ? user.bikes : [];
            });
    }

}