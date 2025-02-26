import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationMapComponent } from './station-map.component';
import * as L from 'leaflet';
import stationDataJSON from '../../data/station-data.json';

describe('StationMapComponent', () => {
  let component: StationMapComponent;
  let fixture: ComponentFixture<StationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the map after view init', () => {
    spyOn(component as any, 'loadMap');

    component.ngAfterViewInit();

    expect(component['loadMap']).toHaveBeenCalled();
  });

  it('should load coordinates correctly when station is set', () => {
    const mockStation = stationDataJSON[0]?.name!;
    component.station = mockStation;

    component.loadCoordinates();

    const expectedCoordinates = stationDataJSON.find(s => s.name === mockStation)?.coordinates;
    expect(component.latitud).toBe(expectedCoordinates?.[0]);
    expect(component.longitud).toBe(expectedCoordinates?.[1]);
  });

  it('should update map when station changes', () => {
    spyOn(component as any, 'loadCoordinates');
    spyOn(component as any, 'loadMap');

    component.ngOnChanges({
      station: {
        previousValue: 'Old Station',
        currentValue: 'New Station',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component['loadCoordinates']).toHaveBeenCalled();
    expect(component['loadMap']).toHaveBeenCalled();
  });

});
