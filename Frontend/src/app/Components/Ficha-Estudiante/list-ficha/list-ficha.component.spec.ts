import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFichaComponent } from './list-ficha.component';

describe('ListFichaComponent', () => {
  let component: ListFichaComponent;
  let fixture: ComponentFixture<ListFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
