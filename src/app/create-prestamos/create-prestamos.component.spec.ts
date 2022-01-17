import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrestamosComponent } from './create-prestamos.component';

describe('CreatePrestamosComponent', () => {
  let component: CreatePrestamosComponent;
  let fixture: ComponentFixture<CreatePrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrestamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
