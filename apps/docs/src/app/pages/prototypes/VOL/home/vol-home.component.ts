import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GpButtonComponent } from '../../../../../../../shared/components/button/gp-button.component';
import { GpIconComponent } from '../../../../../../../shared/components/icon/gp-icon.component';

@Component({
  selector: 'percepta-vol-home',
  standalone: true,
  imports: [CommonModule, GpButtonComponent, GpIconComponent],
  templateUrl: './vol-home.component.html',
  styleUrl: './vol-home.component.scss'
})
export class VolHomeComponent {
  constructor(private readonly router: Router) {}

  goToLogin(): void {
    this.router.navigateByUrl('/prototypes/vol/login');
  }
}
