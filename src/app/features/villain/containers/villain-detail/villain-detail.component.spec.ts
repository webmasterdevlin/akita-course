import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VillainDetailComponent } from './villain-detail.component';

describe('VillainDetailComponent', () => {
  let component: VillainDetailComponent;
  let fixture: ComponentFixture<VillainDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VillainDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
