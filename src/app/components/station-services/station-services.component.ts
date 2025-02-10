import { CommonModule } from '@angular/common';
import { Component, Input, type OnChanges, type OnInit, type SimpleChanges } from '@angular/core';
import stationsDataJSON from '../../data//station-data.json';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Service {
  serviceName: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-station-services',
  imports: [CommonModule, MatIconModule, TranslatePipe],
  templateUrl: './station-services.component.html',
  styleUrl: './station-services.component.scss'
})
export class StationServicesComponent implements OnInit, OnChanges {
  @Input() station: string = '';
  stationServices: Service[] = [];

  ngOnInit(): void {
    this.selectStationService();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['station']) {
      this.selectStationService();
    }
  }

  selectStationService(): void {
    const stationData: any = stationsDataJSON.find((station) => station.name === this.station);
    this.stationServices = stationData.services;
  }
}

