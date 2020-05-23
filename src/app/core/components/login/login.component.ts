import { Component, OnInit } from '@angular/core';

import { StravaAuthService } from '../../services/strava-auth.service';

const STRAVA_URL = 'http://www.strava.com/oauth/authorize?client_id=33524&response_type=code&redirect_uri=http://localhost:4200/home&approval_prompt=force&scope=read';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [StravaAuthService]
})
export class LoginComponent implements OnInit {

  constructor(
    private stravaAuth: StravaAuthService
  ) { }

  ngOnInit(): void {
  }

  onLoginButtonClick() {
    window.open(STRAVA_URL);
  }

}
