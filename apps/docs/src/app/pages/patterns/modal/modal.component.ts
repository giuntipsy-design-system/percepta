import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  GpModalBodyDirective,
  GpModalComponent
} from '../../../../../../shared/components/modal/gp-modal.component';
import { GpButtonComponent } from '../../../../../../shared/components/button/gp-button.component';

@Component({
  selector: 'gp-pattern-modal',
  standalone: true,
  imports: [CommonModule, GpModalComponent, GpModalBodyDirective, GpButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  isInfoOpen = false;
  isConfirmOpen = false;
  isDestructiveOpen = false;

  openInfo(): void {
    this.isInfoOpen = true;
  }

  openConfirm(): void {
    this.isConfirmOpen = true;
  }

  openDestructive(): void {
    this.isDestructiveOpen = true;
  }

  closeInfo(): void {
    this.isInfoOpen = false;
  }

  closeConfirm(): void {
    this.isConfirmOpen = false;
  }

  closeDestructive(): void {
    this.isDestructiveOpen = false;
  }
}
