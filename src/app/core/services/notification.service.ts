import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  async showNotification(notificationMessage: string, isShared: boolean = true) {
    const prefix = isShared ? 'shared.errors.' : '';
    const messageKey = `${prefix}${notificationMessage}`;
    this._translateService
      .get([messageKey, 'shared.buttons.close'])
      .subscribe((translated) => {
        const message = translated[messageKey];
        const action = translated['shared.buttons.close'];
        this._snackBar.open(message, action, {duration: 5000});
      });
  }
}
