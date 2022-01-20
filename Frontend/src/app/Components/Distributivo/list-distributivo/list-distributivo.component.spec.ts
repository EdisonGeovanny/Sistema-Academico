import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDistributivoComponent } from './list-distributivo.component';

describe('ListDistributivoComponent', () => {
  let component: ListDistributivoComponent;
  let fixture: ComponentFixture<ListDistributivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDistributivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDistributivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
