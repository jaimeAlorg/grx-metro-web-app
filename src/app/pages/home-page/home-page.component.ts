import { Component, HostListener, type OnDestroy, type OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { StationPageComponent } from "../station-page/station-page.component";
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { TrainLocationComponent } from '../../components/train-location/train-location.component';
import { ScheduleInformationComponent } from '../../components/schedule-information/schedule-information.component';

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
  imports: [HeaderComponent, FooterComponent, CommonModule, StationPageComponent, MatDividerModule, TrainLocationComponent, ScheduleInformationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {

  //TODO, build the list from the json file
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
  isNarrowScreen: boolean = false;

  //TODO Change name to constants
  MOBILE_VIEW_WIDTH: number = 940;
  NARROW_SCREEN_WIDTH: number = 1350;
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

      //TODO: Send again the message to keep the connection alive
    });
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
    this.webSocketService.closeConnection();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkViewport();
  }

  checkViewport(): void {
    this.isMobileView = window.innerWidth < this.MOBILE_VIEW_WIDTH;
    this.isNarrowScreen = window.innerWidth < this.NARROW_SCREEN_WIDTH;
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
