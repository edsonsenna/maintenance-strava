import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as jwt from 'jwt-decode';
import { TokenValues } from '../enums/token-values';
import { TokenResponse } from '../interfaces/token-response';

const AUTH_TOKEN = 'ms-auth-token';

@Injectable()
export class TokenService {

    constructor(private cookieService: CookieService) {}

    get token() {
        return localStorage.getItem(TokenValues.TOKEN_KEY);
    }

    save(tokenResponse: TokenResponse) {
        localStorage.setItem(TokenValues.TOKEN_KEY, tokenResponse.access_token);
        localStorage.setItem(TokenValues.EXP_DATE_KEY, JSON.stringify(tokenResponse.expires_at));
        localStorage.setItem(TokenValues.REFRESH_KEY, tokenResponse.refresh_token);
        localStorage.setItem(TokenValues.ATHLETE_INFO_KEY, JSON.stringify(tokenResponse.athlete));
    }

    get hasToken() {
        return !!localStorage.getItem(TokenValues.TOKEN_KEY);
    }

    get isTokenValid() {
        const tokenExp = localStorage.getItem(TokenValues.EXP_DATE_KEY);
        console.log('Seconds', tokenExp);
        console.log(new Date(Number(tokenExp)));
        return true;
    }

}