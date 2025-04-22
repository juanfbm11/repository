import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuReservasComponent } from './cu-reservas.component';

describe('CuReservasComponent', () => {
  let component: CuReservasComponent;
  let fixture: ComponentFixture<CuReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
