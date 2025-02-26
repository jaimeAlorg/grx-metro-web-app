import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationPageComponent } from './station-page.component';
import { StationMapComponent } from "../../components/station-map/station-map.component";
import { TimeCardComponent } from '../../components/time-card/time-card.component';
import { StationServicesComponent } from "../../components/station-services/station-services.component";
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

describe('StationPageComponent', () => {
    let component: StationPageComponent;
    let fixture: ComponentFixture<StationPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StationPageComponent,
                StationMapComponent,
                TimeCardComponent,
                StationServicesComponent,
                TranslatePipe,
                CommonModule],
            providers: [TranslatePipe]
        }).compileComponents();

        fixture = TestBed.createComponent(StationPageComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should accept station input', () => {
        component.station = 'Albolote';
        fixture.detectChanges();
        expect(component.station).toBe('Albolote');
    });

    it('should accept isTabletView input', () => {
        component.isTabletView = true;
        fixture.detectChanges();
        expect(component.isTabletView).toBeTrue();
    });

    it('should accept stationData input', () => {
        const mockData = {
            id: 1,
            stationName: 'Albolote',
            timeAlbolote1: '10:00',
            timeAlbolote2: '10:30',
            timeArmilla1: '10:15',
            timeArmilla2: '10:45',
            arrivalTimeAlbolote1: '10:05',
            arrivalTimeAlbolote2: '10:35',
            arrivalTimeArmilla1: '10:20',
            arrivalTimeArmilla2: '10:50',
            currentStationToAlbolote: '1',
            currentStationToArmilla: '2'
        };

        component.stationData = mockData;
        fixture.detectChanges();

        expect(component.stationData).toEqual(mockData);
    });

    it('should emit goBackToListEvent when goBackToList is called', () => {
        spyOn(component.goBackToListEvent, 'emit');

        component.goBackToList();

        expect(component.goBackToListEvent.emit).toHaveBeenCalledWith(false);
    });
});
