import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEstComponent } from './nota-est.component';

describe('NotaEstComponent', () => {
  let component: NotaEstComponent;
  let fixture: ComponentFixture<NotaEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaEstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
