import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GpButtonComponent } from '../../../../../../../shared/components/button/gp-button.component';
import { GpIconComponent } from '../../../../../../../shared/components/icon/gp-icon.component';
import { GpInputComponent } from '../../../../../../../shared/components/input/gp-input.component';
import {
  GpModalBodyDirective,
  GpModalComponent
} from '../../../../../../../shared/components/modal/gp-modal.component';

@Component({
  selector: 'percepta-vol-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RadioButtonModule,
    GpButtonComponent,
    GpIconComponent,
    GpInputComponent,
    GpModalComponent,
    GpModalBodyDirective
  ],
  templateUrl: './vol-home.component.html',
  styleUrl: './vol-home.component.scss'
})
export class VolHomeComponent {
  newEvaluationType: 'apply' | 'correct' = 'apply';
  isNewEvaluationOpen = false;

  constructor(private readonly router: Router) {}

  goToProfile(): void {
    this.router.navigateByUrl('/prototypes/vol/profile');
  }

  openNewEvaluation(): void {
    this.isNewEvaluationOpen = true;
  }

  closeNewEvaluation(): void {
    this.isNewEvaluationOpen = false;
  }

  confirmNewEvaluation(): void {
    this.isNewEvaluationOpen = false;
  }
}
