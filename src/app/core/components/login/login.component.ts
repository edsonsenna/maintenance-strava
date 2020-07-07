import { Component, OnInit } from '@angular/core';

import { StravaService } from '../../services/strava.service';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../../environments/environment';


const STRAVA_URL = environment.stravaConfig.stravaAuthUrl;
const CLIENT_ID_PARAM = environment.stravaConfig.clientId;
const STRAVA_FULL_URL = `${STRAVA_URL}authorize?client_id=${CLIENT_ID_PARAM}&response_type=code&redirect_uri=http://localhost:4200/login&approval_prompt=force&scope=profile:read_all,activity:read_all`;

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [StravaService]
})
export class LoginComponent implements OnInit {

  constructor(
    private stravaService: StravaService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void { 
    console.log('Init login');
  }

  onLoginButtonClick() {
    window.open(STRAVA_FULL_URL);
  }


}
