import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEstComponent } from './view-est.component';

describe('ViewEstComponent', () => {
  let component: ViewEstComponent;
  let fixture: ComponentFixture<ViewEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
