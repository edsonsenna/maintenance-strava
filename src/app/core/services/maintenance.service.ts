import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Maintenance } from '../interfaces/maintenance';
import { Collections } from '../enums/collections';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private _firestore: AngularFirestore) {}

  async setMaitenance(
    userId: number,
    maintenance: Maintenance
  ): Promise<boolean> {
    const maintenanceId = maintenance?.id || null;
    delete maintenance.id;

    const maintenanceRef = this._firestore
      .collection(Collections.USERS)
      .doc(`${userId}`)
      .collection(Collections.MAINTENANCES);

    return await maintenanceId
      ? maintenanceRef
          .doc(`${maintenanceId}`)
          .update({
            ...maintenance,
          })
          .then(
            (_res) => true,
            (_err) => false
          )
      : maintenanceRef.add(maintenance).then(
          (_res) => true,
          (_err) => false
        );
  }

  getMaintenanceById(userId: number, maintenanceId: string): Promise<any> {
    return this._firestore
      .collection(Collections.USERS)
      .doc(`${userId}`)
      .collection(Collections.MAINTENANCES)
      .doc(`${maintenanceId}`)
      .get()
      .toPromise()
      .then((doc) =>
        doc?.exists ? { id: maintenanceId, ...doc.data() } : null
      )
      .catch((_) => null);
  }
}
