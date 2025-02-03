import { Component, Host, HostListener, type OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { StationPageComponent } from "../station-page/station-page.component";
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

export interface StationData {
  id: number;
  stationName: string;
  timeAlbolote1: string;
  timeAlbolote2: string;
  timeArmilla1: string;
  timeArmilla2: string;
}

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent, CommonModule, StationPageComponent, MatDividerModule],
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
  stationData: StationData = {
    id: 0,
    stationName: '',
    timeAlbolote1: '',
    timeAlbolote2: '',
    timeArmilla1: '',
    timeArmilla2: ''
  };

  private messageSubscription: Subscription | undefined;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.sendMessage(this.selectedStation);
    this.checkViewport();
    this.messageSubscription = this.webSocketService.getMessage().subscribe((data: any) => {
      this.stationData = {
        id: data.id,
        stationName: data.stationName,
        timeAlbolote1: data.timeAlbolote1,
        timeAlbolote2: data.timeAlbolote2,
        timeArmilla1: data.timeArmilla1,
        timeArmilla2: data.timeArmilla2
      };
    });
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
    this.sendMessage(station);
    this.scrollToTop();

  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sendMessage(station: string): void {
    this.webSocketService.sendMessage(station);
  }

}
