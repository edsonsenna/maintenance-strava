import { Component, OnInit } from '@angular/core';

import { StravaAuthService } from '../../services/strava-auth.service';
import { TokenService } from '../../services/token.service';

const STRAVA_URL = 'http://www.strava.com/oauth/authorize?client_id=33524&response_type=code&redirect_uri=http://localhost:4200/home&approval_prompt=force&scope=read';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [StravaAuthService, TokenService]
})
export class LoginComponent implements OnInit {

  constructor(
    private stravaAuth: StravaAuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log(this.verifyHasToken());
    if(this.verifyHasToken()) {
      console.log(this.tokenService.isTokenValid);
    }
  }

  onLoginButtonClick() {
    window.open(STRAVA_URL);
  }

  verifyHasToken() {
    return this.tokenService.hasToken;
  }

}
