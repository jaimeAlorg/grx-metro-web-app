import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInformationComponent } from './schedule-information.component';

describe('ScheduleInformationComponent', () => {
  let component: ScheduleInformationComponent;
  let fixture: ComponentFixture<ScheduleInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
