import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gp-patterns',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './patterns.component.html',
  styleUrl: './patterns.component.scss'
})
export class PatternsComponent {}
