import { Injectable } from '@angular/core';

import { TokenValues } from '../enums/token-values';
import { TokenResponse } from '../interfaces/token-response';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {}
    
    save(tokenResponse: TokenResponse) {
        if(tokenResponse.access_token) {
            localStorage.setItem(TokenValues.TOKEN_KEY, tokenResponse.access_token);
        }
        if(tokenResponse.expires_at) {
            localStorage.setItem(TokenValues.EXP_DATE_KEY, JSON.stringify(tokenResponse.expires_at));
        }
        if(tokenResponse.refresh_token) {
            localStorage.setItem(TokenValues.REFRESH_KEY, tokenResponse.refresh_token);
        }
        if(tokenResponse.athlete) {
            localStorage.setItem(TokenValues.ATHLETE_INFO_KEY, JSON.stringify(tokenResponse.athlete));
        }
    }
    
    clearAllTokens() {
        localStorage.removeItem(TokenValues.TOKEN_KEY);
        localStorage.removeItem(TokenValues.EXP_DATE_KEY);
        localStorage.removeItem(TokenValues.REFRESH_KEY);
        localStorage.removeItem(TokenValues.ATHLETE_INFO_KEY);
    }

    get token() {
        return localStorage.getItem(TokenValues.TOKEN_KEY);
    }

    get userId() {
        const user = JSON.parse(localStorage.getItem(TokenValues.ATHLETE_INFO_KEY) || null);
        return user?.id ? user.id : null;
    }

    get userFirstName() {
        const user = JSON.parse(localStorage.getItem(TokenValues.ATHLETE_INFO_KEY) || null);
        return user?.id ? user.firstname : null;
    }


    get hasToken() {
        return !!localStorage.getItem(TokenValues.TOKEN_KEY);
    }

    get isTokenValid() {
        const expDateMs = localStorage.getItem(TokenValues.EXP_DATE_KEY) || null;
        if(expDateMs) {
            const expDateString = Number(`${expDateMs}`.padEnd(13, '0'));
            const expDate = new Date(expDateString);
            return expDate.getTime() > Date.now();
        }
        return false;
    }


}