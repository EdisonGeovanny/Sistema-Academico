import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutEstComponent } from './list-aut-est.component';

describe('ListAutEstComponent', () => {
  let component: ListAutEstComponent;
  let fixture: ComponentFixture<ListAutEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAutEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAutEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
