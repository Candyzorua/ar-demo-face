import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LipstickComponent } from './lipstick.component';

describe('LipstickComponent', () => {
  let component: LipstickComponent;
  let fixture: ComponentFixture<LipstickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LipstickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LipstickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
