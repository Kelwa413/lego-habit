import { Injectable, signal } from '@angular/core';
import { AppState } from './models/app-state';

const KEY = 'legoHabit.state';

@Injectable({ providedIn: 'root' })
export class StateService {
  private stateSig = signal<AppState>(this.load());
  state = this.stateSig.asReadonly();

  private load(): AppState {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private save(state: AppState) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  setPairingCode(code: string) {
    const newState = { ...this.stateSig(), pairingCode: code.trim() };
    this.stateSig.set(newState);
    this.save(newState);
  }

  clearPairing() {
    const newState = {};
    this.stateSig.set(newState);
    localStorage.removeItem(KEY);
  }
}
