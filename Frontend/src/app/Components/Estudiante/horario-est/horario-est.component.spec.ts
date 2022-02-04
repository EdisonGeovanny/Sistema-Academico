import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioEstComponent } from './horario-est.component';

describe('HorarioEstComponent', () => {
  let component: HorarioEstComponent;
  let fixture: ComponentFixture<HorarioEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
