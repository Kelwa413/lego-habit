import { Routes } from '@angular/router';
import { PairingComponent } from './features/pairing/pairing';
import { Setup } from './features/setup/setup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pair', pathMatch: 'full' },
  { path: 'pair', component: PairingComponent },
  { path: 'setup', component: Setup },
  { path: '**', redirectTo: 'pair' },
];
