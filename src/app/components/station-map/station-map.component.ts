import { Component, type AfterViewInit, type OnInit, Input, type OnChanges, type SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import stationData from '../../data/station-data.json';

@Component({
  selector: 'app-station-map',
  imports: [],
  templateUrl: './station-map.component.html',
  styleUrl: './station-map.component.scss'
})
export class StationMapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() station: string = '';
  private map!: L.Map;
  private marker!: L.Marker;
  latitud: number | undefined = undefined;
  longitud: number | undefined = undefined;

  ngOnInit(): void {
    this.loadCoordinates();
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['station']?.previousValue !== undefined && changes['station']?.currentValue !== changes['station']?.previousValue) {
      this.map.remove();
      this.loadCoordinates();
      this.loadMap();
    }
  }


  private loadMap(): void {
    this.initMap();
    this.addMarker();
    this.centerMap();
  }

  private loadCoordinates(): void {
    const coordinates = stationData.find((station) => station.name === this.station)?.coordinates || [];
    this.latitud = coordinates[0];
    this.longitud = coordinates[1];
  }


  private initMap(): void {
    const baseMapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map', {
      center: [this.latitud ? this.latitud : 0, this.longitud ? this.longitud : 0],
      zoom: 13
    });
    L.tileLayer(baseMapURL).addTo(this.map);
  }

  private addMarker(): void {
    let markeIcon = {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 0],
        iconUrl: 'marker-icon.png',
        shadowUrl: 'marker-shadow.png'
      })
    };
    this.marker = L.marker([this.latitud ? this.latitud : 0, this.longitud ? this.longitud : 0], markeIcon).addTo(this.map).bindPopup(this.station).openPopup();
  }

  private centerMap(): void {
    const bounds = L.latLngBounds([this.marker.getLatLng()]);
    this.map.fitBounds(bounds);
  }

}
