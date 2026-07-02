import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaUniversidadComponent } from './la-universidad.component';

describe('LaUniversidadComponent', () => {
  let component: LaUniversidadComponent;
  let fixture: ComponentFixture<LaUniversidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaUniversidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
