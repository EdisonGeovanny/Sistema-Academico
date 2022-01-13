import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPeriodoComponent } from './reg-periodo.component';

describe('RegPeriodoComponent', () => {
  let component: RegPeriodoComponent;
  let fixture: ComponentFixture<RegPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPeriodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
