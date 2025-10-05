import { Injectable, signal } from '@angular/core';
import { AppState, HabitConfig } from './models/app-state';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const KEY = 'legoHabit.state';

@Injectable({ providedIn: 'root' })
export class StateService {
  constructor(private http: HttpClient) {}
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

  checkIn(action: 'up' | 'down') {
    const url = action === 'up' ? 'http://100.102.19.51:3000/up' : 'http://100.102.19.51:3000/down';

    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post(url, '', { headers, responseType: 'text' });
  }

  clearAll() {
    this.stateSig.set({});
    localStorage.removeItem(KEY);
  }

  pingServer() {
    return this.http.get<{ health: number }>('http://100.102.19.51:3000/ping');
  }
}
