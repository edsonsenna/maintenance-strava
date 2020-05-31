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
            .doc(`${user.athlete.id}`)
            .set(user)
            .then(res => {
                console.log(res);
                return true;
            },
            err => {
                console.log(err);
                return false;
            })
    }

    async findUserById(userId: string): Promise<User> {
        let user:User = await this.firestore
        .collection(COLLECTION_USERS)
        .doc(userId)
        .get()
        .toPromise()
        .then((doc) => 
                doc.exists 
                    ? <User>doc.data() 
                    : null)
        .catch(err => {
            console.log('Erro ao buscar usuario ', err);
            return null;
        });

        return user;
    }

    
}