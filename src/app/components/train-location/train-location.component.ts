import { Component, Input, type SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-train-location',
  imports: [MatCardModule, MatIconModule, TranslatePipe],
  templateUrl: './train-location.component.html',
  styleUrl: './train-location.component.scss'
})
export class TrainLocationComponent {
  @Input() trainToAlbolote: string = '';
  @Input() trainToArmilla: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trainToAlbolote']?.previousValue !== changes['trainToAlbolote']?.currentValue) {
      console.log(`trainToAlbolote changed: ${this.trainToAlbolote}`);
    }

    if (changes['trainToArmilla']?.previousValue !== changes['trainToArmilla']?.currentValue) {
      console.log(`trainToArmilla changed: ${this.trainToArmilla}`);
    }
  }
}
