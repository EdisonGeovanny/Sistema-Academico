import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEstComponent } from './log-est.component';

describe('LogEstComponent', () => {
  let component: LogEstComponent;
  let fixture: ComponentFixture<LogEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
