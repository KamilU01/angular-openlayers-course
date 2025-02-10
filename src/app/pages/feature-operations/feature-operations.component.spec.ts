import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureOperationsComponent } from './feature-operations.component';

describe('FeatureOperationsComponent', () => {
  let component: FeatureOperationsComponent;
  let fixture: ComponentFixture<FeatureOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
