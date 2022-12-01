import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vacanca } from 'src/app/model/vacanca.model';

@Component({
  selector: 'app-vacanca-card',
  templateUrl: './vacanca-card.component.html',
  styleUrls: ['./vacanca-card.component.scss']
})
export class VacancaCardComponent implements OnInit {

  @Input() vacanca: Vacanca;
  @Output() buttonClicked: EventEmitter<Vacanca> = new EventEmitter();

  constructor() {
    this.vacanca = {} as Vacanca;
  }

  ngOnInit(): void {

  }

  clicked() {
    this.buttonClicked.emit(this.vacanca!);
  }

}
