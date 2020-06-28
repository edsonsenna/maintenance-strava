import { Injectable } from '@angular/core';
import { AngularFirestore,  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Maintenance } from '../interfaces/maintenance';
import { Collections } from '../enums/collections';

@Injectable()
export class MaintenanceService {

    constructor(
        private _firestore: AngularFirestore
    ) {}


    async createMaitenance(maintenance: Maintenance): Promise<boolean> {
        return await this._firestore
            .collection(Collections.MAINTENANCES)
            .add(maintenance)
            .then(res => {
                console.log(res);
                return true;
            },
            err => {
                console.log(err);
                return false;
            });
    }

    async getMaintenanceById(userId: number, maintenanceId: number): Promise<Maintenance>  {
        return null;
    }
}