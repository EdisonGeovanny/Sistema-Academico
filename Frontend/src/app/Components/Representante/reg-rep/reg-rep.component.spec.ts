import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegRepComponent } from './reg-rep.component';

describe('RegRepComponent', () => {
  let component: RegRepComponent;
  let fixture: ComponentFixture<RegRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegRepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
