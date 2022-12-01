import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewVacancaPage } from './new-vacanca.page';

const routes: Routes = [
  {
    path: '',
    component: NewVacancaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewVacancaPageRoutingModule {}
