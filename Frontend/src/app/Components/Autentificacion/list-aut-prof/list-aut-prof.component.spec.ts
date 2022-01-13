import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutProfComponent } from './list-aut-prof.component';

describe('ListAutProfComponent', () => {
  let component: ListAutProfComponent;
  let fixture: ComponentFixture<ListAutProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAutProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAutProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
