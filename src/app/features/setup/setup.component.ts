import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../../core/state.service';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

type HabitKind = 'start' | 'stop';
type HabitFrequency = 'daily' | 'times-per-week';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
  ],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class Setup {
  kindForm;
  nameForm;
  freqForm;

  constructor(private fb: FormBuilder, private state: StateService, private router: Router) {
    this.kindForm = this.fb.nonNullable.group({
      kind: 'start' as HabitKind,
    });

    this.nameForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    });

    this.freqForm = this.fb.nonNullable.group({
      frequency: 'daily' as HabitFrequency,
      timesPerWeek: 4,
      checkInTime: '20:00', // required by model; keep a default
    });
  }

  finish() {
    const kind = this.kindForm.value.kind as HabitKind;
    const name = this.nameForm.value.name!.trim();
    const frequency = this.freqForm.value.frequency as HabitFrequency;
    const timesPerWeek =
      frequency === 'times-per-week' ? this.freqForm.value.timesPerWeek ?? 4 : undefined;
    const checkInTime = this.freqForm.value.checkInTime!;

    this.state.setHabit({
      kind,
      name,
      checkInTime,
    });

    this.router.navigateByUrl('/dashboard');
  }
}
