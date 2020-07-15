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

  async showNotification(notification: string) {
    this._translateService
      .get(['shared.errors.'+notification, 'shared.buttons.close'])
      .subscribe((translated) => {
        const message = translated['shared.errors.'+notification];
        const action = translated['shared.buttons.close'];
        this._snackBar.open(message, action, {duration: 30000});

      })
  }
}
