import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDistributivoComponent } from './reg-distributivo.component';

describe('RegDistributivoComponent', () => {
  let component: RegDistributivoComponent;
  let fixture: ComponentFixture<RegDistributivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegDistributivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegDistributivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
