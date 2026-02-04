// vol-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GpButtonComponent } from '../../../../../../../shared/components/button/gp-button.component';
import { GpInputComponent } from '../../../../../../../shared/components/input/gp-input.component';

@Component({
  selector: 'percepta-vol-login',
  standalone: true,
  imports: [GpInputComponent, GpButtonComponent],
  templateUrl: './vol-login.component.html',
  styleUrls: ['./vol-login.component.scss']
})
export class VolLoginComponent {
  constructor(private readonly router: Router) {}

  goToHome(): void {
    this.router.navigateByUrl('/prototypes/vol/home');
  }
}
