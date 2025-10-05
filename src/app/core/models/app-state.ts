export interface AppState {
  pairingCode?: string;
  habit?: HabitConfig;
}

export interface HabitConfig {
  name: string;
  kind: 'start' | 'stop';
  checkInTime: string;
}
