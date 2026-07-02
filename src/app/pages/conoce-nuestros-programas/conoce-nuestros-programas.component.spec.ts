import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConoceNuestrosProgramasComponent } from './conoce-nuestros-programas.component';

describe('ConoceNuestrosProgramasComponent', () => {
  let component: ConoceNuestrosProgramasComponent;
  let fixture: ComponentFixture<ConoceNuestrosProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConoceNuestrosProgramasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConoceNuestrosProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
