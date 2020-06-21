import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { StravaService } from '../../services/strava.service';
import { TokenResponse } from '../../interfaces/token-response';
import { Athlete } from '../../interfaces/athlete';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';

const AUTH_TOKEN = 'ms-auth-token';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TokenService, StravaService, UserService]
})
export class HomeComponent implements OnInit {

  private userCode: string = null;
  private athlete: Athlete = null;
  private user: User = null;

  constructor(
    private route: ActivatedRoute,
    private stravaAuth: StravaService,
    private cookieService: CookieService,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  async ngOnInit() {
    this.receiveQueryParams();
    await this.getUserToken();
    await this.findUser();
    //await this.createOrUpdateUser();
  }

  receiveQueryParams() {

    this.route
      .queryParams
      .pipe(filter(params => params.code))
      .subscribe(params => {
        this.userCode = params?.code;
      });

  }

  async getUserToken() {
    if(this.userCode) {
      const receiveTokenReponse = {
        next: (response: TokenResponse) => {
          if(response.access_token && response.expires_in) {
            localStorage.setItem(AUTH_TOKEN, response.access_token);
          }
          if(response.athlete) {
            this.athlete = response.athlete;
          }
          this.tokenService.save(response);
          console.log(response);
          console.log(this.athlete);
        }
      }
      return await this.stravaAuth
        .getAuthToken(this.userCode)
        .pipe(tap(receiveTokenReponse))
        .toPromise()
        .then(() => true)
        .catch(() => false);
    }

    return Promise.resolve(false);
  }

  async findUser() {
    this.user = await this.userService.findUserById(`${this.athlete.id}`);
    console.log('User by Id', this.user);
  }

  async createOrUpdateUser() {
    this.user = {
      created: new Date(),
      update: new Date(),
      athlete: this.athlete
    };

    const userCreated = await this.userService.createUser(this.user);
    console.log('Creating' + userCreated);
  }

}
