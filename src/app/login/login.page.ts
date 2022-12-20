import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	credentials: FormGroup | undefined;

	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router,
		private userService: UserService
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials!.get('email');
	}

	get password() {
		return this.credentials!.get('password');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async register() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.register(this.credentials!.value);
		await loading.dismiss();

		if (user) {
			const coordinates = await Geolocation.getCurrentPosition();
			console.log('Current position:', coordinates);		  
			const userid = await this.authService.getLoggedUserUid();
			console.log('user id:', userid);		  
			const user: User = {
				email: this.credentials!.get('email')?.value,
				id: userid,
				geolocation: JSON.stringify(coordinates),
				pushtoken: ''
			};
			this.userService.setUserToFireStore(user);
			this.router.navigateByUrl('/tabs', { replaceUrl: true });
		} else {
			this.showAlert('Registration failed', 'Please try again!');
		}
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials!.value);
		await loading.dismiss();

		if (user) {
			this.router.navigate(['/tabs']);
		} else {
			this.showAlert('Login failed', 'Please try again!');
		}
	}

	async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}
}