export interface AppState {
  pairingCode?: string;
  habit?: HabitConfig;
  habitState?: HabitState;
}

export interface HabitConfig {
  kind: 'start' | 'stop';
  name: string;
  frequency: 'daily' | 'times-per-week';
  timesPerWeek?: number;
  checkinTime: string;
}

export interface HabitState {
  lastCheckISO?: string;
  lastOutcome?: 'success' | 'fail';
}
