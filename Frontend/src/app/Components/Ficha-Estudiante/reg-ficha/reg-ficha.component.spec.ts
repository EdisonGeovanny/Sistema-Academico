import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFichaComponent } from './reg-ficha.component';

describe('RegFichaComponent', () => {
  let component: RegFichaComponent;
  let fixture: ComponentFixture<RegFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
