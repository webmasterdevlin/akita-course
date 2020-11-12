import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VillainsComponent } from './villains.component';

describe('VillainsComponent', () => {
  let component: VillainsComponent;
  let fixture: ComponentFixture<VillainsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VillainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
