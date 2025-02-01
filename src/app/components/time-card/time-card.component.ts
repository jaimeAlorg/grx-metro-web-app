import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-time-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './time-card.component.html',
  styleUrl: './time-card.component.scss'
})
export class TimeCardComponent {
  @Input() isMobileView: boolean = false;

}
