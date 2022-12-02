import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vacanca } from '../model/vacanca.model';
import { AuthService } from '../services/auth.service';
import { VacancesService } from '../services/vacances.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  vacances: Vacanca[] = []

  constructor(private vacancesService: VacancesService,
    private router: Router) {}

  ionViewWillEnter() {
    this.vacancesService.getVacances().then((res) => {
      this.vacances = res;
      console.log(this.vacances);      
    });
  }

  showDetails(vacanca: Vacanca) {
    console.log(vacanca);    
  }

  goToNew() {
    this.router.navigate(['/new-vacanca'], { replaceUrl: true });
  }

}
