import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const STRAVA_URL = environment.stravaConfig.stravaUrl;
const CLIENT_ID_PARAM = environment.stravaConfig.clientId;
const CLIENT_SECRET_PARAM = environment.stravaConfig.clientSecret
const GRANT_TYPE = environment.stravaConfig.grantType;

@Injectable()
export class StravaAuthService {

    constructor(private http: HttpClient) {}

    getAuthToken(userCode: string) {
        return this.http
            .post(`${STRAVA_URL}token?client_id=${CLIENT_ID_PARAM}&client_secret${CLIENT_SECRET_PARAM}&code=${userCode}&${GRANT_TYPE}`, {});
    }

}