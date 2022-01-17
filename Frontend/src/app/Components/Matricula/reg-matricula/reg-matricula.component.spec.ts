import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegMatriculaComponent } from './reg-matricula.component';

describe('RegMatriculaComponent', () => {
  let component: RegMatriculaComponent;
  let fixture: ComponentFixture<RegMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegMatriculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
