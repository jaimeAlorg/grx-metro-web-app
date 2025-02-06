import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainLocationComponent } from './train-location.component';

describe('TrainLocationComponent', () => {
  let component: TrainLocationComponent;
  let fixture: ComponentFixture<TrainLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
