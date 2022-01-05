import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFichaComponent } from './view-ficha.component';

describe('ViewFichaComponent', () => {
  let component: ViewFichaComponent;
  let fixture: ComponentFixture<ViewFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
