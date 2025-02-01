import { Component, type AfterViewInit, type OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-station-map',
  imports: [],
  templateUrl: './station-map.component.html',
  styleUrl: './station-map.component.scss'
})
export class StationMapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarker();
    this.centerMap();
  }

  private initMap(): void {
    const baseMapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map', {
      center: [37.186459091559485, -3.608757494233437],
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
    this.marker = L.marker([37.186459091559485, -3.608757494233437], markeIcon).addTo(this.map).bindPopup('My Station').openPopup();
  }

  private centerMap(): void {
    const bounds = L.latLngBounds([this.marker.getLatLng()]);
    this.map.fitBounds(bounds);
  }

}
