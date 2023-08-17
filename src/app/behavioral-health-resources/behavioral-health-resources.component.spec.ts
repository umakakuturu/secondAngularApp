import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehavioralHealthResourcesComponent } from './behavioral-health-resources.component';

describe('BehavioralHealthResourcesComponent', () => {
  let component: BehavioralHealthResourcesComponent;
  let fixture: ComponentFixture<BehavioralHealthResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BehavioralHealthResourcesComponent]
    });
    fixture = TestBed.createComponent(BehavioralHealthResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
