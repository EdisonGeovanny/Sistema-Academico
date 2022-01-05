import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepComponent } from './view-rep.component';

describe('ViewRepComponent', () => {
  let component: ViewRepComponent;
  let fixture: ComponentFixture<ViewRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
