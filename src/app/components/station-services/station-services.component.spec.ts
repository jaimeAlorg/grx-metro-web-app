import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationServicesComponent } from './station-services.component';

describe('StationServicesComponent', () => {
  let component: StationServicesComponent;
  let fixture: ComponentFixture<StationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
