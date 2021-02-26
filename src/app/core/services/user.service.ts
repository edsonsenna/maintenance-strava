import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '@interfaces/user';
import { UserDetail } from '@interfaces/user-detail';

const COLLECTION_USERS = 'users';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _firestore: AngularFirestore) {}

  async createUser(user: User): Promise<boolean> {
    return await this._firestore
      .collection(COLLECTION_USERS)
      .doc(`${user.athlete.id}`)
      .set(user)
      .then(
        (res) => {
          return true;
        },
        (err) => {
          return false;
        }
      );
  }

  async findUserById(userId: string): Promise<User> {
    let user: User = await this._firestore
      .collection(COLLECTION_USERS)
      .doc(`${userId}`)
      .get()
      .toPromise()
      .then((doc) => (doc.exists ? <User>doc.data() : null))
      .catch((err) => {
        return null;
      });

    return user;
  }

  async updateUser(userId: String, userInfo: User): Promise<boolean> {
    return await this._firestore
      .collection(COLLECTION_USERS)
      .doc(`${userId}`)
      .update({
        ...userInfo
      })
      .then(() => true)
      .catch(() => false);
  }

  async getRefreshToken(userId: string): Promise<boolean> {
    return null;
  }
}
