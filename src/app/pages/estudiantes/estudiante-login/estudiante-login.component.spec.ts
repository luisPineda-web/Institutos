import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteLoginComponent } from './estudiante-login.component';

describe('EstudianteLoginComponent', () => {
  let component: EstudianteLoginComponent;
  let fixture: ComponentFixture<EstudianteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
