import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationServicesComponent } from './station-services.component';
import stationsDataJSON from '../../data/station-data.json';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

describe('StationServicesComponent', () => {
  let component: StationServicesComponent;
  let fixture: ComponentFixture<StationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationServicesComponent, CommonModule, MatIconModule, TranslatePipe],
      providers: [TranslatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(StationServicesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectStationService() on ngOnInit', () => {
    const spy = spyOn(component, 'selectStationService');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call selectStationService() when station input changes', () => {
    const spy = spyOn(component, 'selectStationService');
    component.ngOnChanges({ station: { currentValue: 'Albolote', previousValue: '', firstChange: false, isFirstChange: () => false } });
    expect(spy).toHaveBeenCalled();
  });

  it('should update stationServices correctly when a valid station is provided', () => {
    const testStation = stationsDataJSON[0]!.name;
    component.station = testStation;
    component.selectStationService();

    const expectedServices = stationsDataJSON.find(s => s.name === testStation)?.services ?? [];
    expect(component.stationServices).toEqual(expectedServices);
  });
});