import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';

import { User } from '../interfaces/user';

const COLLECTION_USERS = 'users';

@Injectable()
export class UserService {

    constructor(private firestore: AngularFirestore) {}

    async createUser(user: User): Promise<boolean> {
        return await this.firestore
            .collection(COLLECTION_USERS)
            .add(user)
            .then(res => {
                console.log(res);
                return true;
            },
            err => {
                console.log(err);
                return false;
            })
    }

    async findUserById(id: number): Promise<User> {
        return await this.firestore
            .collection(COLLECTION_USERS, ref => ref.where('athlete.id', '==', id))
            .get()
            .toPromise()
            .then(docs => {
                let user: DocumentData = null;
                docs.forEach(doc => {
                    if(!user && doc.id && doc.data()) {
                        user = doc.data();
                    }
                })
                return user;
            })
            .catch(_ => null);
    }

    
}