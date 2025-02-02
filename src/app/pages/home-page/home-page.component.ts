import { Component, Host, HostListener, type OnInit } from '@angular/core';
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
export class HomePageComponent implements OnInit {
  stationList: string[] = [
    'Albolote',
    'Juncaril',
    'Vicuña',
    'Anfiteatro',
    'Maracena',
    'Cerrillo de Maracena',
    'Jaén',
    'Estación de autobuses',
    'Argentinita',
    'Luís Amador',
    'Villarejo',
    'Caleta',
    'Estación de ferrocarril',
    'Universidad',
    'Méndez Núñez',
    'Recogidas',
    'Alcázar Genil',
    'Hípica',
    'Andrés Segovia',
    'Palacio de deportes',
    'Nuevo Los Cármenes',
    'Dílar',
    'Parque tecnológico',
    'Sierra Nevada',
    'Fernando de los Ríos',
    'Armilla',
  ];
  selectedStation: string = 'Albolote';
  showStationData: boolean = false;
  isMobileView: boolean = false;

  MOBILE_VIEW_WIDTH: number = 750;

  ngOnInit(): void {
    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkViewport();
  }

  checkViewport(): void {
    this.isMobileView = window.innerWidth < this.MOBILE_VIEW_WIDTH;
  }

  goBackToList($event: boolean): void {
    this.showStationData = $event;
  }

  toggleStation(station: string): void {
    this.selectedStation = station;
    this.showStationData = true;
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
