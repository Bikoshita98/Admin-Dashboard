import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsComponentTsComponent } from './analytics.component';

describe('AnalyticsComponentTsComponent', () => {
  let component: AnalyticsComponentTsComponent;
  let fixture: ComponentFixture<AnalyticsComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsComponentTsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
