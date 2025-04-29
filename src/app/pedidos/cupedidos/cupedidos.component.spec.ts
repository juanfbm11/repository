import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupedidosComponent } from './cupedidos.component';

describe('CupedidosComponent', () => {
  let component: CupedidosComponent;
  let fixture: ComponentFixture<CupedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CupedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CupedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
