import { Component, OnInit } from '@angular/core';
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
export class Dashboard implements OnInit {
  plantHealth: number | null = null;
  loadingHealth = false;

  constructor(public state: StateService) {}

  ngOnInit() {
    this.refreshHealth();
  }

  refreshHealth() {
    this.loadingHealth = true;
    this.state.pingServer().subscribe({
      next: (res) => {
        this.plantHealth = res?.health ?? null;
      },
      error: () => {
        this.plantHealth = null;
      },
      complete: () => {
        this.loadingHealth = false;
      },
    });
  }

  doCheckIn() {
    const habit = this.state.state().habit;
    if (!habit) {
      alert('No habit found. Please set one up first.');
      return;
    }

    const action = habit.kind === 'start' ? 'up' : 'down';
    const msg =
      habit.kind === 'start'
        ? `🌿 Great job! Your plant will survive until your next check-in time (${habit.checkInTime}).`
        : `💀 Oops! Your plant died, but it will come back to life after your next check-in time (${habit.checkInTime}).`;

    this.state.checkIn(action).subscribe({
      next: () => {
        alert(msg);
        this.refreshHealth();
      },
      error: (err) => {
        console.error('Check-in failed:', err);
        alert('Could not reach the plant. Try again.');
      },
    });
  }

  testUp() {
    this.state.checkIn('up').subscribe({
      next: () => {
        console.log('up');
        this.refreshHealth();
      },
      error: (err) => console.error('Test up failed:', err),
    });
  }

  testDown() {
    this.state.checkIn('down').subscribe({
      next: () => {
        console.log('down');
        this.refreshHealth();
      },
      error: (err) => console.error('Test down failed:', err),
    });
  }

  clearStorage() {
    this.state.clearAll();
    alert('Local data cleared.');
    this.plantHealth = null;
  }
}
