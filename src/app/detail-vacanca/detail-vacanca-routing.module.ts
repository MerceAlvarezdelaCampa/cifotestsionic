import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailVacancaPage } from './detail-vacanca.page';

const routes: Routes = [
  {
    path: '',
    component: DetailVacancaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailVacancaPageRoutingModule {}
