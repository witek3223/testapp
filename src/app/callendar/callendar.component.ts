import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-callendar',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './callendar.component.html',
})
export class CallendarComponent {
  selectedDate = new Date().getMonth();

  daysInMonth = new Date(new Date().getFullYear(), this.selectedDate + 1, 0).getDate();

  startDay = new Date(new Date().getFullYear(), this.selectedDate, 0).getDay();

  daysArray: number[][] = [];

  months = [0,1,2,3,4,5,6,7,8,9,10,11];


  constructor() {
    this.adjustDaysArray();
    console.log(this.daysArray);
  }

  private adjustDaysArray(): void {
    let tempArray: number[] = [];
    this.daysArray = [];
    let maxDays = this.daysInMonth + this.startDay;
    for(let i = 1; i <= maxDays + 7 - (maxDays%7); ++i) {
      if(i > this.startDay) {
        if (i > maxDays) {
          tempArray.push(0);
        } else {
          tempArray.push(i - this.startDay);
        }
      } else {
        tempArray.push(0);
      }
      if (i%7 === 0) {
        if (tempArray.some((item) => item !== 0)) {
          this.daysArray.push(tempArray);
        }
        tempArray = [];
      }
    }
  }

  onSelectedDateChange(newSelectedDate: number): void {
    this.selectedDate = newSelectedDate;
    this.daysInMonth = new Date(new Date().getFullYear(), this.selectedDate + 1, 0).getDate();
    this.startDay = new Date(new Date().getFullYear(), this.selectedDate, 0).getDay();
    this.adjustDaysArray();
  }
}
