import { Routes } from '@angular/router';
import { PairingComponent } from './features/pairing/pairing';

export const routes: Routes = [
  { path: '', redirectTo: 'pair', pathMatch: 'full' },
  { path: 'pair', component: PairingComponent },
  { path: '**', redirectTo: 'pair' },
];
