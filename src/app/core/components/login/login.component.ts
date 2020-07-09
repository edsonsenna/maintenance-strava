import { Component, OnInit, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';

import { StravaService } from '../../services/strava.service';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../../environments/environment';

const STRAVA_URL = environment.stravaConfig.stravaAuthUrl;
const CLIENT_ID_PARAM = environment.stravaConfig.clientId;
const HOST = new URL(window.location.href).origin;
const STRAVA_FULL_URL = `${STRAVA_URL}authorize?client_id=${CLIENT_ID_PARAM}&response_type=code&redirect_uri=${HOST}/login&approval_prompt=force&scope=profile:read_all,activity:read_all`;

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [StravaService]
})
export class LoginComponent implements OnInit {

  constructor(
    private stravaService: StravaService,
    private tokenService: TokenService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void { }

  onLoginButtonClick() {
    window.open(STRAVA_FULL_URL);
  }


}
