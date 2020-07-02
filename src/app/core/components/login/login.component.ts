import { Component, OnInit } from '@angular/core';

import { StravaService } from '../../services/strava.service';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';


const STRAVA_URL = environment.stravaConfig.stravaAuthUrl;
const CLIENT_ID_PARAM = environment.stravaConfig.clientId;

const STRAVA_FULL_URL = `${STRAVA_URL}authorize?client_id=${CLIENT_ID_PARAM}&response_type=code&redirect_uri=http://localhost:4200/login&approval_prompt=force&scope=read_all,profile:read_all`;

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
