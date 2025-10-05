import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../core/state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class Dashboard {
  constructor(public state: StateService) {}

  doCheckIn() {
    const s = this.state.state();
    const habit = s.habit;
    if (!habit) {
      alert('No habit found. Please set one up first.');
      return;
    }

    const action = habit.kind === 'start' ? 'up' : 'down';
    const message =
      habit.kind === 'start'
        ? `🌿 Great job! Your plant is safe until your next check-in time (${habit.checkInTime}).`
        : `💀 Oops! you hurt your plant, but it will come back to life after your next check-in time (${habit.checkInTime}).`;

    this.state.checkIn(action);
    alert(message);
  }
}
