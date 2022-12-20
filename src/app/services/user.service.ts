import { Injectable } from '@angular/core';
import { addDoc, collection, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore,
    private authService: AuthService) { }

  setUserToFireStore(user: User) {
    const UsersRef = collection(this.firestore, 'Users');
    return addDoc(UsersRef, user);
  }

  getUser(id: string) {
    const UserDocRef = doc(this.firestore, `Users/${id}`);
    return docData(UserDocRef, { idField: 'id' }) as Observable<User>;
  }

  updateUser(user: User, id: string) {
    const UserDocRef = doc(this.firestore, `Users/${id}`);
    return updateDoc(UserDocRef, {
      email: user.email,
      id: user.id,
      geolocation: user.geolocation,
      pushtoken: user.pushtoken
    });
  }

  async updateUserToken(token: string) {
    const userId: string = await this.authService.getLoggedUserUid();
    console.log('METAG userid', userId);
    this.getUser(userId).subscribe((user: User) => {
      console.log('METAG user', user);
      const newUser: User = {...user, pushtoken: token};
      console.log('METAG newUser', newUser);
      this.updateUser(user, userId).then((data) => {
        console.log('METAG ok', data);
      }, (err) => {
        console.log('METAG ko', err);
      });
    })
    
  }

}
