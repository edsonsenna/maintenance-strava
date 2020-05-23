import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maintenance-strava';
  public items: Observable<any[]>;

  constructor(private angularFirestore: AngularFirestore) {
    console.log('Constructed!');
    this.items = this.angularFirestore.collection('items', ref => ref.where('name', '==', 'Edson')).valueChanges();
  }
}
