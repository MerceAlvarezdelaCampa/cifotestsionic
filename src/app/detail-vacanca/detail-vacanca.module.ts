import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailVacancaPageRoutingModule } from './detail-vacanca-routing.module';

import { DetailVacancaPage } from './detail-vacanca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailVacancaPageRoutingModule
  ],
  declarations: [DetailVacancaPage]
})
export class DetailVacancaPageModule {}
