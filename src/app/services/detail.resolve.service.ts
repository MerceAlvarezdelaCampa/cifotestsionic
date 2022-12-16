import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Vacanca } from '../model/vacanca.model';
import { VacancesService } from './vacances.service';

@Injectable({ providedIn: 'root' })
export class VacancaResolver implements Resolve<Vacanca> {
  constructor(private service: VacancesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Vacanca>|Promise<Vacanca>|Vacanca {
    // return this.service.getVacancaById(route.paramMap.get('id')!);
    return this.service.getVacancaById(this.service.getParamsDetail().id);
  }
}