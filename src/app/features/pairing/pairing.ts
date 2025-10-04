import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../core/state';

@Component({
  selector: 'app-pairing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pairing.html',
  styleUrls: ['./pairing.scss'],
})
export class PairingComponent {
  code = '';

  constructor(private state: StateService) {}

  get savedCode() {
    return this.state.state().pairingCode;
  }

  save() {
    this.state.setPairingCode(this.code.trim());
    this.code = '';
  }

  clear() {
    this.state.clearPairing();
  }
}
