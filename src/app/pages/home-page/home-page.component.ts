import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { StationPageComponent } from "../station-page/station-page.component";

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent, CommonModule, StationPageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  stationList: string[] = ['Station 1', 'Station 2', 'Station 3', 'Station 4', 'Station 5', 'Station 6', 'Station 7', 'Station 8', 'Station 9', 'Station 10'];
  selectedStation: string = '';

  toggleStation(station: string): void {
    this.selectedStation = station;
    console.log('Selected station:', station, this.selectedStation);
  }

}
