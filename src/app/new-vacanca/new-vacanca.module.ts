import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewVacancaPageRoutingModule } from './new-vacanca-routing.module';

import { NewVacancaPage } from './new-vacanca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewVacancaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewVacancaPage]
})
export class NewVacancaPageModule {}
