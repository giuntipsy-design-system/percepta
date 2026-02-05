import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GpButtonComponent } from '../../../../../../../shared/components/button/gp-button.component';
import { GpIconComponent } from '../../../../../../../shared/components/icon/gp-icon.component';
import { GpInputComponent } from '../../../../../../../shared/components/input/gp-input.component';

@Component({
  selector: 'percepta-vol-home',
  standalone: true,
  imports: [CommonModule, GpButtonComponent, GpIconComponent, GpInputComponent],
  templateUrl: './vol-home.component.html',
  styleUrl: './vol-home.component.scss'
})
export class VolHomeComponent {
  constructor(private readonly router: Router) {}

  goToProfile(): void {
    this.router.navigateByUrl('/prototypes/vol/profile');
  }
}
