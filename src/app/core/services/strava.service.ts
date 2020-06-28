import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';


const STRAVA_AUTH_URL = environment.stravaConfig.stravaAuthUrl;
const STRAVA_API_URL = environment.stravaConfig.stravaBaseApiUrl;
const CLIENT_ID_PARAM = environment.stravaConfig.clientId;
const CLIENT_SECRET_PARAM = environment.stravaConfig.clientSecret
const GRANT_TYPE = environment.stravaConfig.grantType;

@Injectable()
export class StravaService {

    constructor(private http: HttpClient) {}

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
            .toPromise().then((user:any) => {
                return user?.bikes ? user.bikes : [];
            });
    }

}