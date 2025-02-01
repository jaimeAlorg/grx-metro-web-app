import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-station-services',
  imports: [CommonModule],
  templateUrl: './station-services.component.html',
  styleUrl: './station-services.component.scss'
})
export class StationServicesComponent {
  stationServices: string[] = ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5'];
}
