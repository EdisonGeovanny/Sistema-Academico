import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutSystemEComponent } from './aut-system-e.component';

describe('AutSystemEComponent', () => {
  let component: AutSystemEComponent;
  let fixture: ComponentFixture<AutSystemEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutSystemEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutSystemEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
