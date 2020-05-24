import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

    async findUserById(id: string): Promise<User> {
        let user: User = null;

        return null;
    }

    
}