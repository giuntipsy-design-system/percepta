import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GpButtonComponent } from '../../../../../shared/components/button/gp-button.component';

@Component({
  selector: 'gp-home',
  standalone: true,
  imports: [GpButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private readonly router: Router) {}

  goTo(path: string): void {
    void this.router.navigateByUrl(path);
  }
}
