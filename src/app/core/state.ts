import { Injectable, signal } from '@angular/core';
import { AppState, HabitConfig } from './models/app-state';
import { from } from 'rxjs';

const KEY = 'legoHabit.state';

@Injectable({ providedIn: 'root' })
export class StateService {
  private stateSig = signal<AppState>(this.load());
  state = this.stateSig.asReadonly();

  private load(): AppState {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch {
      return {};
    }
  }

  private save(state: AppState) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  setPairingCode(code: string) {
    const next = { ...this.stateSig(), pairingCode: code.trim() };
    this.stateSig.set(next);
    this.save(next);
  }

  setHabit(habit: HabitConfig) {
    const next = { ...this.stateSig(), habit };
    this.stateSig.set(next);
    this.save(next);
  }

  clearAll() {
    this.stateSig.set({});
    localStorage.removeItem(KEY);
  }

  checkIn() {
    const s = this.stateSig();
    if (!s.habit) return;
    const outcome = s.habit.kind === 'start' ? 'success' : 'fail'; // single-button behavior
    const next: AppState = {
      ...s,
      habitState: { lastCheckISO: new Date().toISOString(), lastOutcome: outcome },
    };
    this.stateSig.set(next);
    this.save(next);
  }
}
