import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component'
import { VacancaCardComponent } from './components/vacanca-card/vacanca-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    VacancaCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    IonicModule,
    HeaderComponent,
    VacancaCardComponent,
    TranslateModule
  ]
})
export class SharedModule { }
