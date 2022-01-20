import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveNotasComponent } from './active-notas.component';

describe('ActiveNotasComponent', () => {
  let component: ActiveNotasComponent;
  let fixture: ComponentFixture<ActiveNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
