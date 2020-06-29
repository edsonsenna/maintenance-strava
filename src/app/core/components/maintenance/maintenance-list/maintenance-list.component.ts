import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TokenService } from '../../../services/token.service';
import { Collections } from '../../../enums/collections';
import { Maintenance } from '../../../interfaces/maintenance';

@Component({
  selector: 'ms-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {

  private maintenanceCollection: AngularFirestoreCollection<Maintenance> = null
  public maintenances: Observable<Maintenance[]> = null;

  constructor(
    private _firestore: AngularFirestore,
    private _tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getMaintenances();
  }

  getMaintenances() {
    this.maintenanceCollection = this._firestore
      .collection(Collections.USERS)
      .doc(`${this._tokenService.userId}`)
      .collection(Collections.MAINTENANCES);
    this.maintenances = this.maintenanceCollection.valueChanges();
  }

}
