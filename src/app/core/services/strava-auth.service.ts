import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const STRAVA_URL = 'http://www.strava.com/oauth/'
const CLIENT_ID_PARAM = 'client_id=33524';
const CLIENT_SECRET_PARAM = 'client_secret=4417fb89842153873e3a17c8c474b39454ecd272';
const USER_CODE = 'code=';
const GRANT_TYPE = 'grant_type=authorization_code';

@Injectable()
export class StravaAuthService {

    constructor(private http: HttpClient) {}

    getAuthToken(userCode: string) {
        return this.http
            .post(`${STRAVA_URL}token?${CLIENT_ID_PARAM}&${CLIENT_SECRET_PARAM}&${USER_CODE}${userCode}&${GRANT_TYPE}`, {});
    }

}