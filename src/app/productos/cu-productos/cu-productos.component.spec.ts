import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuProductosComponent } from './cu-productos.component';

describe('CuProductosComponent', () => {
  let component: CuProductosComponent;
  let fixture: ComponentFixture<CuProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuProductosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CuProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
