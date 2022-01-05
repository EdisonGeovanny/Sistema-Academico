import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutProfComponent } from './aut-prof.component';

describe('AutProfComponent', () => {
  let component: AutProfComponent;
  let fixture: ComponentFixture<AutProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
