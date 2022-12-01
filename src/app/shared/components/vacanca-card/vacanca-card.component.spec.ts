import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancaCardComponent } from './vacanca-card.component';

describe('VacancaCardComponent', () => {
  let component: VacancaCardComponent;
  let fixture: ComponentFixture<VacancaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
