import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEstComponent } from './reg-est.component';

describe('RegEstComponent', () => {
  let component: RegEstComponent;
  let fixture: ComponentFixture<RegEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
