import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	authState
} from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private auth: Auth) {}

	async register({ email, password }: any) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	async login({ email, password }: any) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	logout() {
		return signOut(this.auth);
	}

	async getLoggedUserUid(): Promise<string> {
		const user = this.auth.currentUser!.uid;
		return user;
	}

}