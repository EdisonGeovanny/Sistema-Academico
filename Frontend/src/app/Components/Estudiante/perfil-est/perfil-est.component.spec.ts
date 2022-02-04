import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEstComponent } from './perfil-est.component';

describe('PerfilEstComponent', () => {
  let component: PerfilEstComponent;
  let fixture: ComponentFixture<PerfilEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
