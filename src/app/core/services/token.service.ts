import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as jwt from 'jwt-decode';

@Injectable()
export class TokenService {

    constructor(private cookieService: CookieService) {}

    getToken() {
        return this.cookieService.get('AUTH_TOKEN');
    }

    saveToken(token: string, expires_in: number) {
        this.cookieService.set('AUTH_TOKEN', token, expires_in, '/');
    }
}