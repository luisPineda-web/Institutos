import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotelComponent } from './cotel.component';

describe('CotelComponent', () => {
  let component: CotelComponent;
  let fixture: ComponentFixture<CotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
