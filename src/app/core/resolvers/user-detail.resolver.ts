import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { User } from '@interfaces/user';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolver implements Resolve<User> {
  constructor(
    private _tokenService: TokenService,
    private _userService: UserService
  ) {}
  resolve(): Promise<User> {
    return this._userService.findUserById(this._tokenService.userId);
  }
}
