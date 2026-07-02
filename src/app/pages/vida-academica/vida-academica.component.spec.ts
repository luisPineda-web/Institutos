import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidaAcademicaComponent } from './vida-academica.component';

describe('VidaAcademicaComponent', () => {
  let component: VidaAcademicaComponent;
  let fixture: ComponentFixture<VidaAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VidaAcademicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VidaAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
