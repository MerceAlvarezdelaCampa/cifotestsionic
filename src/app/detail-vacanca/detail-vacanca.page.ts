import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Vacanca } from '../model/vacanca.model';
import { VacancesService } from '../services/vacances.service';

@Component({
  selector: 'app-detail-vacanca',
  templateUrl: './detail-vacanca.page.html',
  styleUrls: ['./detail-vacanca.page.scss'],
})
export class DetailVacancaPage implements OnInit {

  vacanca!: Vacanca;

  constructor(private vacancesService: VacancesService,
    private route: ActivatedRoute,
    private router: Router) {
      this.route.data.subscribe(({ vacanca }) => {
        this.vacanca = vacanca;
        console.log(vacanca);
      })  
    }

  ngOnInit() {
    // this.route.paramMap
    //   .subscribe((params: any) => {
    //     console.log(params);
    //     this.vacancesService.getVacancaById(params.params.id).subscribe(result => {
    //       console.log(result);          
    //     });
    //   }
    // );
  }

}
