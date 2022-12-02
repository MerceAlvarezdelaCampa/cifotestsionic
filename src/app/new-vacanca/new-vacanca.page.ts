import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vacanca } from '../model/vacanca.model';
import { AuthService } from '../services/auth.service';
import { VacancesService } from '../services/vacances.service';

@Component({
  selector: 'app-new-vacanca',
  templateUrl: './new-vacanca.page.html',
  styleUrls: ['./new-vacanca.page.scss'],
})
export class NewVacancaPage {

  stateObject = {
    submitted: false,
    hasErrors: true
  }

  newForm!: FormGroup;

  constructor(
    private vacancesService: VacancesService,
    private router: Router,
    private authService: AuthService) {
    }

  ionViewWillEnter() {
    this.newForm = new FormGroup({
      'nom': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'preu': new FormControl(null, [Validators.required]),
      'pais': new FormControl(null, []),
      'descripcio': new FormControl(null, [])
    });  
  }

  async addVacanca() {
    this.stateObject.submitted = true;
    const userid = await this.authService.getLoggedUserUid();
    if (this.newForm.valid) {
      const v: Vacanca = {} as unknown as Vacanca;
      v.nom = this.newForm.get('nom')?.value;
      v.descripcio = this.newForm.get('descripcio')?.value;
      v.pais = this.newForm.get('pais')?.value;
      v.preu = this.newForm.get('preu')?.value;
      v.user = userid;
      this.vacancesService.addVacanca(v);
      this.stateObject.submitted = false;
      this.router.navigate(['/tabs/tab1']);
    }
  }

}
