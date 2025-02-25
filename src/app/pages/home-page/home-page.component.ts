import { Component, HostListener, type OnDestroy, type OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { StationPageComponent } from "../station-page/station-page.component";
import { WebSocketService } from '../../services/web-socket-service/web-socket.service';
import { Subscription, interval, startWith, switchMap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { TrainLocationComponent } from '../../components/train-location/train-location.component';
import { ScheduleInformationComponent } from '../../components/schedule-information/schedule-information.component';
import stationDataJSON from '../../data/station-data.json';

export interface StationData {
  id: number;
  stationName: string;
  timeAlbolote1: string;
  timeAlbolote2: string;
  timeArmilla1: string;
  timeArmilla2: string;
  arrivalTimeAlbolote1: string;
  arrivalTimeAlbolote2: string;
  arrivalTimeArmilla1: string;
  arrivalTimeArmilla2: string;
  currentStationToAlbolote: string;
  currentStationToArmilla: string;
}

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent, CommonModule, StationPageComponent, MatDividerModule, TrainLocationComponent, ScheduleInformationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  stationList: string[] = [];
  selectedStation: string = 'Albolote';
  showStationData: boolean = false;
  isMobileView: boolean = false;
  isTabletView: boolean = false;
  isNarrowScreen: boolean = false;
  isFullInformationSectionVisible: boolean = false;

  NARROW_SCREEN_WIDTH: number = 1350;
  INFORMATION_SECTION_WIDTH: number = 700;
  TABLET_VIEW_WIDTH: number = 940;
  MOBILE_VIEW_WIDTH: number = 600;

  stationData: StationData = {
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

  private messageSubscription: Subscription | undefined;

  constructor(private webSocketService: WebSocketService) {
    this.stationList = stationDataJSON.map((station: any) => station.name);
  }

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
        timeArmilla2: data.timeArmilla2,
        arrivalTimeAlbolote1: data.arrivalTimeAlbolote1,
        arrivalTimeAlbolote2: data.arrivalTimeAlbolote2,
        arrivalTimeArmilla1: data.arrivalTimeArmilla1,
        arrivalTimeArmilla2: data.arrivalTimeArmilla2,
        currentStationToAlbolote: data.currentStationToAlbolote,
        currentStationToArmilla: data.currentStationToArmilla
      };
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
    this.isTabletView = window.innerWidth < this.TABLET_VIEW_WIDTH;
    this.isNarrowScreen = window.innerWidth < this.NARROW_SCREEN_WIDTH;
    this.isFullInformationSectionVisible = window.innerWidth > this.INFORMATION_SECTION_WIDTH;
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
