import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDistributivoComponent } from './view-distributivo.component';

describe('ViewDistributivoComponent', () => {
  let component: ViewDistributivoComponent;
  let fixture: ComponentFixture<ViewDistributivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDistributivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDistributivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
