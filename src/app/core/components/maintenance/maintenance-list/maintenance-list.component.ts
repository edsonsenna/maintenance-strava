import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TokenService } from '../../../services/token.service';
import { Collections } from 'src/app/core/enums/collections';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ms-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {

  public maintenances = null;

  constructor(
    private _firestore: AngularFirestore,
    private _tokenService: TokenService
  ) { }

  ngOnInit() {
    this.maintenances = this._firestore
        .collection(Collections.USERS)
        .doc(`${this._tokenService.userId}`)
        .collection(Collections.MAINTENANCES)
        .valueChanges();
  }

}
