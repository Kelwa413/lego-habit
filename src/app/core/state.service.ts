import { Injectable, signal } from '@angular/core';
import { AppState, HabitConfig } from './models/app-state';

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

  private save(s: AppState) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  private set(next: AppState) {
    this.stateSig.set(next);
    this.save(next);
  }

  setPairingCode(code: string) {
    const s = this.stateSig();
    this.set({ ...s, pairingCode: code.trim() });
  }

  setHabit(habit: HabitConfig) {
    const s = this.stateSig();
    this.set({ ...s, habit });
  }

  getHabit(): HabitConfig | undefined {
    return this.stateSig().habit;
  }

  checkIn(action: 'up' | 'down'): void {
    console.log(`Simulating plant motion: ${action}`);
    // TODO: Replace this with API communication
  }

  clearAll() {
    this.stateSig.set({});
    localStorage.removeItem(KEY);
  }
}
