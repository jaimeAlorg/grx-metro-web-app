import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-schedule-information',
  imports: [TranslatePipe],
  templateUrl: './schedule-information.component.html',
  styleUrl: './schedule-information.component.scss'
})
export class ScheduleInformationComponent {

}
