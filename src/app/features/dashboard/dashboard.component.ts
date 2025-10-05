import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateService } from '../../core/state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class Dashboard {
  constructor(public state: StateService) {}

  doCheckIn() {
    const habit = this.state.state().habit;
    if (!habit) {
      alert('No habit found. Please set one up first.');
      return;
    }

    const action = habit.kind === 'start' ? 'up' : 'down';
    this.state.checkIn(action);

    const msg =
      habit.kind === 'start'
        ? `🌿 Great job! Your plant will survive until your next check-in time (${habit.checkInTime}).`
        : `💀 Oops! Your plant died, but it will come back to life after your next check-in time (${habit.checkInTime}).`;
    alert(msg);
  }

  testUp() {
    this.state.checkIn('up');
  }
  testDown() {
    this.state.checkIn('down');
  }

  clearStorage() {
    this.state.clearAll();
    alert('Local data cleared.');
  }
}
