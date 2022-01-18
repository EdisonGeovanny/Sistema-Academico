import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatriculaComponent } from './list-matricula.component';

describe('ListMatriculaComponent', () => {
  let component: ListMatriculaComponent;
  let fixture: ComponentFixture<ListMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMatriculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
