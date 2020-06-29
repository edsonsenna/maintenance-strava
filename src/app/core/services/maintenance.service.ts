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


    async createMaitenance(userId: number, maintenance: Maintenance): Promise<boolean> {
        return await this._firestore
            .collection(Collections.USERS)
            .doc(`${userId}`)
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

    async getMaintenanceById(userId: number, maintenanceId: string): Promise<any>  {
        return await this._firestore
            .collection(Collections.USERS)
            .doc(`${userId}`)
            .collection(Collections.MAINTENANCES)
            .get()
            .toPromise()
            .then(res => {
                const arr = [];
                res.forEach(doc => arr.push(doc.data()))
                return arr;
            },
            err => {
                console.log(err);
                return false;
            });
    }
}