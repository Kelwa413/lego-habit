import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
