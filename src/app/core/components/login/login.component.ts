import { Component, OnInit } from '@angular/core';

import { StravaService } from '../../services/strava.service';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';


const STRAVA_URL = environment.stravaConfig.stravaAuthUrl;
const CLIENT_ID_PARAM = environment.stravaConfig.clientId;

const STRAVA_FULL_URL = `${STRAVA_URL}authorize?client_id=${CLIENT_ID_PARAM}&response_type=code&redirect_uri=http://localhost:4200/home&approval_prompt=force&scope=read_all,profile:read_all`;

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [StravaService, TokenService]
})
export class LoginComponent implements OnInit {

  constructor(
    private stravaService: StravaService,
    private tokenService: TokenService
  ) { }

  async ngOnInit(): Promise<boolean> {
    console.log(this.verifyHasToken());
    if(this.verifyHasToken()) {
      const receiveUser = {
        next: (user) => {
          console.log('User ', user);
        },
        error: (err) => {
          console.log(err);
        }
      }

      return await this.stravaService
          .getAuthenticadedUser()
          .pipe(tap(receiveUser))
          .toPromise()
          .then(() => true)
          .catch(() => false);
    }
  }

  onLoginButtonClick() {
    window.open(STRAVA_FULL_URL);
  }

  verifyHasToken() {
    return this.tokenService.hasToken;
  }

}
