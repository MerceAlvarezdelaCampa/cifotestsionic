import { Injectable } from '@angular/core';
import { addDoc, collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  setUserToFireStore(user: User) {
    const UsersRef = collection(this.firestore, 'Users');
    return addDoc(UsersRef, user);
  }

  getUser(id: string) {
    const UserDocRef = doc(this.firestore, `Users/${id}`);
    return docData(UserDocRef, { idField: 'id' }) as Observable<User>;
  }

}
