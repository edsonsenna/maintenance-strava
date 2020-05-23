import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { StravaAuthService } from '../../services/strava-auth.service';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StravaAuthService]
})
export class HomeComponent implements OnInit {

  private userCode: string = null;

  constructor(
    private route: ActivatedRoute,
    private stravaAuth: StravaAuthService
  ) { }

  ngOnInit() {
    this.receiveQueryParams();
    this.getUserToken();
  }

  receiveQueryParams() {

    this.route
      .queryParams
      .pipe(filter(params => params.code))
      .subscribe(params => {
        this.userCode = params?.code;
      });

  }

  getUserToken() {
    if(this.userCode) {
      this.stravaAuth
        .getAuthToken(this.userCode)
        .subscribe(response => {
          console.log(response);
        }) 
    }
  }

}
