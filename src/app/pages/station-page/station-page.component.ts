import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StationMapComponent } from "../../components/station-map/station-map.component";
import { CommonModule } from '@angular/common';
import { TimeCardComponent } from '../../components/time-card/time-card.component';
import { StationServicesComponent } from "../../components/station-services/station-services.component";
import type { StationData } from '../home-page/home-page.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-station-page',
  imports: [StationMapComponent, TimeCardComponent, CommonModule, StationServicesComponent, TranslatePipe],
  templateUrl: './station-page.component.html',
  styleUrl: './station-page.component.scss'
})
export class StationPageComponent {
  @Input() station: string = '';
  @Input() isTabletView: boolean = false;
  @Input() stationData: StationData = {
    id: 0,
    stationName: '',
    timeAlbolote1: '',
    timeAlbolote2: '',
    timeArmilla1: '',
    timeArmilla2: '',
    arrivalTimeAlbolote1: '',
    arrivalTimeAlbolote2: '',
    arrivalTimeArmilla1: '',
    arrivalTimeArmilla2: '',
    currentStationToAlbolote: '',
    currentStationToArmilla: ''
  };
  @Output() goBackToListEvent = new EventEmitter<boolean>();

  goBackToList(): void {
    this.goBackToListEvent.emit(false);
  }


}
