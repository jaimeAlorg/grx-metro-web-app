import { CommonModule } from '@angular/common';
import { Component, Input, type OnChanges, type OnInit, type SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface StationTimes {
  time1: string;
  time2: string;
  arrivalTime1: string;
  arrivalTime2: string;
}

@Component({
  selector: 'app-time-card',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './time-card.component.html',
  styleUrl: './time-card.component.scss'
})
export class TimeCardComponent implements OnInit, OnChanges {
  @Input() isTabletView: boolean = false;
  @Input() station: string = '';
  @Input() isWayToAlbolote: boolean = true;
  @Input() stationData: any = {};

  stationTimes: StationTimes = {
    time1: '',
    time2: '',
    arrivalTime1: '',
    arrivalTime2: ''
  }

  ngOnInit(): void {
    this.buildTimes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stationData'] && changes['stationData'].currentValue) {
      this.buildTimes();
    }
  }

  buildTimes() {
    if (this.isWayToAlbolote) {
      this.stationTimes.time1 = this.stationData.timeAlbolote1;
      this.stationTimes.time2 = this.stationData.timeAlbolote2;
      this.stationTimes.arrivalTime1 = this.stationData.arrivalTimeAlbolote1;
      this.stationTimes.arrivalTime2 = this.stationData.arrivalTimeAlbolote2;

    } else {
      this.stationTimes.time1 = this.stationData.timeArmilla1;
      this.stationTimes.time2 = this.stationData.timeArmilla2;
      this.stationTimes.arrivalTime1 = this.stationData.arrivalTimeArmilla1;
      this.stationTimes.arrivalTime2 = this.stationData.arrivalTimeArmilla2;
    }
  }

  get endStation(): string {
    return this.isWayToAlbolote ? 'Albolote' : 'Armilla';
  }

  get arrowIcon(): string {
    return this.isWayToAlbolote ? 'arrow_upward' : 'arrow_downward';
  }

  get headerName(): string {
    return this.isTabletView ? `Dir. ${this.endStation}` : this.station;
  }
}
