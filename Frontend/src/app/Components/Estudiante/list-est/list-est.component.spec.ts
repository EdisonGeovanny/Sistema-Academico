import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstComponent } from './list-est.component';

describe('ListEstComponent', () => {
  let component: ListEstComponent;
  let fixture: ComponentFixture<ListEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
