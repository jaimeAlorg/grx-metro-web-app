import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-time-card',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './time-card.component.html',
  styleUrl: './time-card.component.scss'
})
export class TimeCardComponent {
  @Input() isMobileView: boolean = false;
  @Input() station: string = '';
  @Input() isWayToAlbolote: boolean = true;

  get endStation(): string {
    return this.isWayToAlbolote ? 'Albolote' : 'Armilla';
  }

  get arrowIcon(): string {
    return this.isWayToAlbolote ? 'arrow_upward' : 'arrow_downward';
  }

  get headerName(): string {
    return this.isMobileView ? `Dir. ${this.endStation}` : this.station;
  }
}
