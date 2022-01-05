import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfComponent } from './view-prof.component';

describe('ViewProfComponent', () => {
  let component: ViewProfComponent;
  let fixture: ComponentFixture<ViewProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
