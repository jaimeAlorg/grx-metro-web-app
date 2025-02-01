import { Component } from '@angular/core';
import { StationMapComponent } from "../../components/station-map/station-map.component";

@Component({
  selector: 'app-station-page',
  imports: [StationMapComponent],
  templateUrl: './station-page.component.html',
  styleUrl: './station-page.component.scss'
})
export class StationPageComponent {

}
