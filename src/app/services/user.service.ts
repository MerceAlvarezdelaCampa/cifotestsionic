import { Injectable } from '@angular/core';
import { addDoc, collection, doc, docData, Firestore, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
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
    const UsersRef = collection(this.firestore, 'users');
    return addDoc(UsersRef, user);
  }

  async getUser(): Promise<User> {
    const userid = await this.authService.getLoggedUserUid();
    return new Promise((resolve, reject) => {
      const q = query(collection(this.firestore, "users"), where("id", "==", userid));
      getDocs(q).then((querySnapshot) => {
        let user: User = {} as User; 
        querySnapshot.forEach((doc) => {
          user = doc.data() as User;
          user = {...user, fid: doc.id};
        });
        resolve(user);
      });
    })
  }

  async updateUser(user: User) {
    const fUser: User = await this.getUser();
    const docRef = doc(this.firestore, "users", fUser.fid!);
    console.log(docRef);     
    return setDoc(docRef, user);
  }

  async updateUserToken(token: string) {
    this.getUser().then((user: User) => {
      const newUser: User = {...user, pushtoken: token};
      this.updateUser(newUser).then((data) => {
        console.log('METAG ok', data);
      }, (err) => {
        console.log('METAG ko', err);
      });
    })
    
  }

}
